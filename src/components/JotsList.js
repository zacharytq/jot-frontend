import { JotCard } from './JotCard';

export const JotsList = (props) => {
  return props.jots.map(jot => <JotCard key={jot.id} title={jot.title} />)
}
