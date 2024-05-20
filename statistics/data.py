import math

# calculating interval projections
def calculate_interval(current_interval, ease_factor, correct):
  if correct:
    interval_modifier = ease_factor
    new_interval = current_interval * interval_modifier
  else:
    new_interval = 1

  return new_interval 

# future due projections
def future_due_projections(intervals, days): 
  # intervals -> list of intervals (in days)
  # days -> number of days in the future

  future_due = [0] * days # initially set to 0 since no number of lists on that day

  for i in intervals:
    due_day = math.ceil(i)
    if due_day < days:
      future_due[due_day] += 1
    
  return future_due

# calculate retention rate
def retention_rate(correct_answers, total_reviews):
  retention_rate = (correct_answers / total_reviews) * 100
  return retention_rate


# calculate average intervals
def calculate_average_interval(intervals):
    total_intervals = sum(intervals)
    total_cards = len(intervals)
    average_interval = total_intervals / total_cards
    return average_interval

