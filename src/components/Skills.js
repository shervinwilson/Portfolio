import { site } from "@/data/site";

export default function Skills() {
  return (
    <div className="skills">
      {site.skills.map((group) => (
        <div key={group.title}>
          <h3>{group.title}</h3>
          <ul>
            {group.items.map((item, index) => (
              <li key={item}>
                <span className="skills__index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
