export const departments = [
  {
    id: 1,
    name: "Headquarters",
  },
  {
    id: 2,
    name: "Branch office",
  },
  {
    id: 3,
    name: "Division"
  },
  {
    id: 4,
    name: "Department"
  }
]

export const positions = [
  {
    id: 1,
    name: "CEO",
  },
  {
    id: 2,
    name: "General Manager",
  },
  {
    id: 3,
    name: "Managing Director"
  },
  {
    id: 4,
    name: "Director"
  }
]
export const orgChartData = [
  {
    id: 1,
    name: 'OSM Maritime HQ',
    fk_company: 3,
    fk_dept_types: 1,
    belongs_to: null,
  },
  {
    id: 2,
    name: 'OSM Maritime Ship Management - Asia',
    fk_company: 3,
    fk_dept_types: 2,
    belongs_to: 1,
  },
  {
    id: 3,
    name: 'OSM Maritime Ship Management - Asia- Tankers',
    fk_company: 3,
    fk_dept_types: 3,
    belongs_to: 2,
  },
  {
    id: 4,
    name: 'OSM Maritime Ship Management - Asia- Bulkers',
    fk_company: 3,
    fk_dept_types: 3,
    belongs_to: 2,
  },
  {
    id: 5,
    name: 'Crew',
    fk_company: 3,
    fk_dept_types: 7,
    belongs_to: 3,
  },
  {
    id: 6,
    name: 'Intellego HQ',
    fk_company: 1,
    fk_dept_types: 1,
    belongs_to: null,
  }
]
