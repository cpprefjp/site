#operator!=
```cpp
bool operator!=(const type_index& rhs) const noexcept;
```

##概要

<b>非等値の判定を行う</b>


##戻り値

`*target != *rhs.target`※targetは、type_indexのメンバ変数として保持されているtype_infoへのポインタ(説明用)



##例外

投げない


##例

```cpp
#include <cassert>
#include <typeindex>

int main()
{
  std::type_index t1 = typeid(int);
  std::type_index t2 = typeid(double);

  assert(t1 != t2);
  assert(t1 != typeid(double));
}
```
* !=[color ff0000]
* !=[color ff0000]

###出力

```cpp
```

##バージョン
```
###言語


- C++11



###処理系

- [GCC, C++0x mode](/implementation#gcc.md): 4.6.1

