function acl_concrete_dominated(concrete, effective) {
  const effectiveACLArr = effective.split(':');
  const concreteArr = concrete.split('/');
  const coveredACLIndex = effectiveACLArr.findIndex(el => el.includes(concreteArr[1]));

  if (coveredACLIndex > -1) {
    const concreteMethods = concreteArr[0].split('');
    const effectiveACLMethods = effectiveACLArr[coveredACLIndex].split('/')[0];
    let covered = true;
    for (let m of concreteMethods) {
      if (effectiveACLMethods.indexOf(m) === -1) covered = false;
    }
    if (covered) return true
  }
  console.error(`${concrete} doesn't cover any of ACLs`)
  return false
}

const testData = [
  {
    concrete: 'P/Time',
    effective: 'G/Time:GDP/Users'
  },
  {
    concrete: 'G/Time',
    effective: 'G/Time:GDP/Users'
  },
  {
    concrete: 'D/Users',
    effective: 'G/Time:GDP/Users'
  },
  {
    concrete: 'P/Time',
    effective: 'G/Time:GDP/Users'
  },
  {
    concrete: 'H/Users',
    effective: 'G/Time:GDP/Users'
  }
];

for (let test of testData) {
  console.info(test)
  console.log(acl_concrete_dominated(test.concrete, test.effective))
}