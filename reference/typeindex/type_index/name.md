#name
```cpp
const char* name() const;
```

##概要

<b>型名を表す文字列を返す</b>


##戻り値

`target->name()`※targetは、type_indexのメンバ変数として保持されているtype_infoへのポインタ(説明用)


##例

```cpp
#include <iostream>
#include <typeindex>

int main()
{
  std::type_index t1 = typeid(int);
  std::type_index t2 = typeid(double);
  std::type_index t3 = typeid(char);

  std::cout << t1.name() << std::endl;
  std::cout << t2.name() << std::endl;
  std::cout << t3.name() << std::endl;
}
```
* t1.name()[color ff0000]
* t2.name()[color ff0000]
* t3.name()[color ff0000]

###出力例

```cpp
i
d
c
```

##バージョン


###言語


- C++11



###処理系

- [GCC, C++0x mode](/implementation#gcc.md): 4.6.1

