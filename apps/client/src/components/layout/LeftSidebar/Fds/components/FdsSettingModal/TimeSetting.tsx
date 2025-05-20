import { useEffect, useState, useRef, memo, useCallback } from 'react'

import { formatTimeToHHMMSS, getHour, getMinute } from './utils';

// TODO: 오버라이드 부분 공통으로 분리하기
interface OverrideDivProps {
  options: {
    border: string
  };
}

const OverrideDisableDivWrap: React.FC<OverrideDivProps> = ({ options }): JSX.Element => {
  const disableClass = `
    absolute z-[777] top-0 left-0 w-full h-full bg-gray-300 opacity-20 rounded-${options.border}
  `
  return (
    <div className={disableClass}></div>
  )
}

interface TimePickerProps {
  defaultTimeVal: string;
  isEditing: boolean;
  timeDv: string;
  onChange: (timeObject: { hour: number; minute: number, period: '오전' | '오후' }, timeDv: string) => void;
}

// TODO: Picker 컴포넌트 해당 경로로 따로 분리하기
/**
 * 시간 컴포넌트
 * @param {string} defaultTimeVal - 기본 시간 값
 * @param {boolean} isEditing - 편집 모드 여부
 * @param {string} timeDv - 시간 구분 (start, end)
 * @param {function} onChange - 시간 변경 시 호출되는 콜백 함수
 * @returns 
 */
const TimePicker: React.FC<TimePickerProps> = memo(({ defaultTimeVal, onChange, timeDv, isEditing }) => {
  const currentHour = getHour(defaultTimeVal);

  // period에 따라 hour 계산
  const getCurrentHour = ((): number => {
    const hour = getHour(defaultTimeVal);
    const period = hour >= 12 ? '오후' : '오전';
    let hourResult: number;
    period === '오전' && hour === 0 ? hourResult = 12 : hourResult = hour;
    if (period === '오전' && hour === 0) {
      hourResult = 12;
    } else if (period === '오전') {
      hourResult = hour;
    } else {
      hourResult = hour === 12 ? 12 : hour - 12;
    };

    return hourResult
  });
  const currentMinute = getMinute(defaultTimeVal);

  let timeInfo = {
    hour: getCurrentHour(),
    minute: currentMinute,
    period: currentHour >= 12 ? '오후' : '오전',
  };

  // 팝업 표시 상태
  const [isTimePopupOpen, setIsTimePopupOpen] = useState<boolean>(false);

  const [hour, setHour] = useState<number>(timeInfo.hour);
  const [minute, setMinute] = useState<number>(timeInfo.minute);
  const [period, setPeriod] = useState<'오전' | '오후'>(timeInfo.period as '오전' | '오후');

  // 시간 업데이트
  const updateTime = () => {
    setPeriod(currentPeriod => currentPeriod = timeInfo.period as '오전' | '오후');
    setHour(currentHour => currentHour = timeInfo.hour);
    setMinute(currentMinute => currentMinute = timeInfo.minute);
  };

  useEffect(() => {
    updateTime();
  }, [defaultTimeVal])

  const currentHeight = 28
  const rotationAngle = 15; 

  const pickerRef = useRef<HTMLDivElement>(null);
  const hourColumnRef = useRef<HTMLDivElement>(null);
  const minuteColumnRef = useRef<HTMLDivElement>(null);
  const periodColumnRef = useRef<HTMLDivElement>(null);

  const hours = Array.from({ length: 12 }, (_, i) => {return i === 0 && 12 || i});
  const minutes = Array.from({ length: 60 }, (_, i) => i);
  const periods = ['오전', '오후'] as const;

  // 변경된 시간 세팅
  useEffect(() => {
    onChange({ hour, minute, period }, timeDv);
  }, [hour, minute, period, onChange, timeDv]);

  useEffect(() => {
    if (isTimePopupOpen) {
      setTimeout(() => {
        scrollToSelected(hourColumnRef.current, hour);
        scrollToSelected(minuteColumnRef.current, minute);
        scrollToSelected(periodColumnRef.current, period);
      }, 50);
    }
  }, [isTimePopupOpen, hour, minute]);

  const handleTimeSetting = (): void => {
    updateTime();
  };

  useEffect(() => {
    !isEditing && handleTimeSetting();
  }, [isEditing])

  useEffect(() => {
    handleTimeSetting()
  }, [defaultTimeVal]);

  const handleScroll = (pickerElement: HTMLElement | null, type: 'hour' | 'minute' | 'period') => {
    if (!pickerElement) return;

    // 스크롤이 멈추면 가장 가까운 항목 선택
    clearTimeout(Number(pickerElement.dataset.scrollTimeout));

    pickerElement.dataset.scrollTimeout = setTimeout(() => {
      const containerHeight = pickerElement.clientHeight;
      const scrollTop = pickerElement.scrollTop;

      // 가장 가까운 항목 인덱스 계산 (스냅)
      const index = Math.round((scrollTop + containerHeight / 2 - currentHeight / 2) / currentHeight);

      let value;
      switch (type) {
        case 'hour':
          value = hours[index - 2];
          (value !== undefined) && setHour(value);
          break;
        case 'minute':
          value = minutes[index - 2];
          (value !== undefined) && setMinute(value);
          break;
        case 'period':
          value = periods[index - 2];
          value && setPeriod(value);
          break;
        default:
          break;
      }
      value !== undefined && scrollToSelected(pickerElement, value);
    }, 100).toString();
  };

  // 스크롤 이벤트 리스너 등록
  useEffect(() => {
    const hourColumn = hourColumnRef.current;
    const minuteColumn = minuteColumnRef.current;
    const periodColumn = periodColumnRef.current;

    const handleHourScroll = () => handleScroll(hourColumn, 'hour');
    const handleMinuteScroll = () => handleScroll(minuteColumn, 'minute');
    const handlePeriodScroll = () => handleScroll(periodColumn, 'period');

    hourColumn && hourColumn.addEventListener('scroll', handleHourScroll);
    minuteColumn && minuteColumn.addEventListener('scroll', handleMinuteScroll);
    periodColumn && periodColumn.addEventListener('scroll', handlePeriodScroll);

    return () => {
      hourColumn && hourColumn.removeEventListener('scroll', handleHourScroll);
      minuteColumn && minuteColumn.removeEventListener('scroll', handleMinuteScroll);
      periodColumn && periodColumn.removeEventListener('scroll', handlePeriodScroll);
    };
  }, [isTimePopupOpen]);

  // 선택된 값으로 스크롤 위치 조정 함수
  const scrollToSelected = (timeElement: HTMLElement | null, value: number | string) => {
    if (!timeElement) return;

    const selectedElement = timeElement.querySelector(`[data-value="${value}"]`);
    if (selectedElement) {
      const containerHeight = timeElement.clientHeight;
      const scrollPosition = (selectedElement as HTMLElement).offsetTop - (containerHeight / 2) + (currentHeight / 2);

      timeElement.scrollTo({
        top: scrollPosition,
        behavior: 'smooth' // CHECKLIST: 시간 선택 창 열 때, 즉시 표현해야하는지 아니면 스크롤 처리해도 되는지 확인
      });
    }
  };
 
  // 항목 클릭 핸들러
  const handleItemClick = (type: 'hour' | 'minute' | 'period', value: number | string) => {
    switch (type) {
      case 'hour':
        setHour(value as number);
        scrollToSelected(hourColumnRef.current, value);
        break;
      case 'minute':
        setMinute(value as number);
        scrollToSelected(minuteColumnRef.current, value);
        break;
      case 'period':
        setPeriod(value as '오전' | '오후');
        scrollToSelected(periodColumnRef.current, value);
        break;
      default:
        break;
    }
  };

  const handleTimePickerPopup = (): void => {
    setIsTimePopupOpen(!isTimePopupOpen);
  }

  // 외부 클릭으로 타임 피커 끄기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setIsTimePopupOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-fit" ref={pickerRef}>
      {
        !isEditing && <OverrideDisableDivWrap options={{ 'border': 'lg' }} />
      }      
      <div
        className={`px-2.5 py-2 rounded-lg text-sm bg-white cursor-pointer min-w-[90px] text-center ${isTimePopupOpen ? 'border-2 border-blue-500' : 'border border-gray-300'
          }`}
        onClick={() => handleTimePickerPopup()}
      >
       {period} {hour.toString().padStart(2, '0')}:{minute.toString().padStart(2, '0')}
      </div>
      {isTimePopupOpen && (
        <div className="absolute -top-[130px] left-2 z-50 bg-white rounded-lg shadow-2xl drop-shadow-2xl p-3 w-[170px]">
          <div className="absolute left-0 right-0 top-1/2 -translate-y-[50%] h-7 bg-black/5 z-0 rounded"></div>
          
          <div className='flex justify-between items-center h-[130px] relative perspective-[500px]'>
            
            <div
              className="flex-1 h-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide relative"
              ref={periodColumnRef}
              style={{ 
                maskImage: 'linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%)'
              }}
            >
              <div className="h-[56px]"></div>
              {periods.map((p) => (
                <div
                  key={p}
                  className="h-7 flex items-center justify-center text-base text-gray-700 cursor-pointer transition-all duration-200 relative snap-center"
                  data-value={p}
                  onClick={() => handleItemClick('period', p)}
                  style={{ 
                    transform: p === period ? 'rotateX(0deg) scale(1.1)' : `rotateX(${p < period ? rotationAngle : -rotationAngle}deg) scale(0.9)`,
                    opacity: p === period ? 1 : 0.6,
                    transformOrigin: 'center center'
                  }}
                >
                  <span className={p === period ? "font-semibold text-lg text-black leading-[28px]" : ""}>
                    {p}
                  </span>
                </div>
              ))}
              <div className="h-[56px]"></div>
            </div>
            {/* 시간 선택 */}
            <div
              className="flex-1 h-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide relative"
              ref={hourColumnRef}
              style={{ 
                maskImage: 'linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%)'
              }}
            >
              <div className="h-[56px]"></div>
              {hours.map((h) => (
                <div
                  key={h}
                  className="h-7 flex items-center justify-center text-base text-gray-700 cursor-pointer transition-all duration-200 relative snap-center"
                  data-value={h}
                  onClick={() => handleItemClick('hour', h)}
                  style={{ 
                    transform: h === hour ? 'rotateX(0deg) scale(1.1)' : `rotateX(${h < hour ? rotationAngle : -rotationAngle}deg) scale(0.9)`,
                    opacity: h === hour ? 1 : 0.6,
                    transformOrigin: 'center center'
                  }}
                >
                  <span className={h === hour ? "font-semibold text-lg text-black" : ""}>
                    {h.toString().padStart(2, '0')}
                  </span>
                </div>
              ))}
              <div className="h-[56px]"></div>
            </div>
            <div
              className="flex-1 h-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide relative"
              ref={minuteColumnRef}
              style={{ 
                maskImage: 'linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%)'
              }}
            >
              <div className="h-[56px]"></div>
              {minutes.map((m) => (
                <div
                  key={m}
                  className="h-7 flex items-center justify-center text-base text-gray-700 cursor-pointer transition-all duration-200 relative snap-center"
                  data-value={m}
                  onClick={() => handleItemClick('minute', m)}
                  style={{ 
                    transform: m === minute ? 'rotateX(0deg) scale(1.1)' : `rotateX(${m < minute ? rotationAngle : -rotationAngle}deg) scale(0.9)`,
                    opacity: m === minute ? 1 : 0.6,
                    transformOrigin: 'center center'
                  }}
                >
                  <span className={m === minute ? "font-semibold text-lg text-black" : ""}>
                    {m.toString().padStart(2, '0')}
                  </span>
                </div>
              ))}
              <div className="h-[56px]"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

const TimeSetting = ({
  title,
  subtitle,
  isEditable,
  isEditing,
  onEdit,
  timeStart,
  timeEnd,
  onSave,
  onCancel,
  disabled = false,
  isTimeAlertEnabled,
  onStartTimeChange,
  onEndTimeChange,
}: {
  title: string
  subtitle: string
  isEditable: boolean
  isEditing: boolean
  onEdit: () => void
  timeStart: string
  timeEnd: string
  onSave: () => void
  onCancel: () => void
  disabled?: boolean,
  isTimeAlertEnabled?: boolean
  onStartTimeChange?: (timeStart: string) => void
  onEndTimeChange?: (timeEnd: string) => void,
}) => {
  const [error, setError] = useState<string>('');
  if(timeStart === '0000' && timeEnd === '0000') {
    timeStart = '080000';
    timeEnd = '180000';
  }
  console.log('disabled: ', disabled);
  console.log('isTimeAlertEnabled: ', isTimeAlertEnabled);

  console.log(`%ctimeStart: ${timeStart}`,'color:yellow;');
  console.log(`%ctimeEnd: ${timeEnd}`,'color:yellow;');

  useEffect(() => {
    isEditing && timeStart === timeEnd ? setError('같은 시각은 선택할 수 없습니다') : setError('');
  }, [isEditing, timeStart, timeEnd])

  // TODO: 나중에 24시간대로 바꿔서 start, end 보내기
  const handleTimeChange = useCallback((timeObject: { hour: number; minute: number, period: '오전' | '오후' }, timeDv: string) => {
    if (timeObject.period === '오후') {
      timeObject = {
        ...timeObject,
        hour: timeObject.hour === 12 ? 12 : timeObject.hour + 12
      }
    } else {
      timeObject = {
        ...timeObject,
        hour: timeObject.hour === 12 ? 0 : timeObject.hour
      }
    }

    let formattedTime = formatTimeToHHMMSS(timeObject);
    if (isEditing) {
      if (timeDv === 'start') {
        onStartTimeChange?.(formattedTime.toString())
      } else if (timeDv === 'end') {
        onEndTimeChange?.(formattedTime.toString())
      }
    }
  },[isEditing, timeStart, timeEnd]);

  const canSave = !error;

  return (
    <>
      <div className='bg-gray-100 p-4 rounded-lg mb-2'>
        <div className='flex justify-between mb-4'>
          <div>
            <p className='text-sm text-gray-700'>{title}</p>
            <p className='text-sm text-gray-700'>{subtitle}</p>
          </div>
          {isEditable ? (
            isEditing ? (
              <div className='space-x-2'>
                <button
                  className={`text-blue-600 text-sm ${!canSave || disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={canSave && !disabled ? onSave : undefined}
                  disabled={!canSave || disabled}
                >
                  저장
                </button>
                <button
                  className={`text-gray-500 text-sm ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={disabled ? undefined : onCancel}
                >
                  취소
                </button>
              </div>
            ) : (
              <button
                className={`text-blue-600 text-sm ${disabled || !isTimeAlertEnabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => {
                  !disabled && isTimeAlertEnabled && onEdit();
                }}
              >
                수정
              </button>
            )
          ) : null}
        </div>
        <div className='flex flex-col'>
          <div className='flex justify-between items-center'>
            <div className='flex items-center space-x-2'>
              {
                (timeStart !== '0000' && timeEnd !== '0000') && (
                  <>
                    <TimePicker defaultTimeVal={timeStart} onChange={handleTimeChange} isEditing={isEditing} timeDv='start' />
                    <span className='px-1.5'>-</span>
                    <TimePicker defaultTimeVal={timeEnd} onChange={handleTimeChange} isEditing={isEditing} timeDv='end' />
                  </>
                )
              }
              
            </div>
            <span className='text-right text-gray-500'>시간 외 출금</span>
          </div>
          
          {error && isEditing && (
            <div className='mt-2 text-red-500 text-sm'>{error}</div>
          )}
        </div>
      </div>
      <span className='text-sm'>&middot; 거래 발생 시점과 알림 발송 시점이 상이 할 수 있습니다.</span>
    </>
  )
}

export default TimeSetting