# name
* typeinfo[meta header]
* std[meta namespace]
* type_info[meta class]
* function[meta id-type]

```cpp
const char* name() const noexcept;
```

## 概要
実装定義の型名を取得する


## 戻り値
実装定義の型名を返す。


## 例外

投げない


## 備考
GCC(libstdc++)は、少なくても4.7時点まではマングリングされた名前を返す。完全な型名を取得するには、デマングルする必要がある。参照：

[C++ のシンボルをデマングルする - bkブ�グ](http://0xcc.net/blog/archives/000095.html)


## 例
```cpp example
#include <iostream>
#include <typeinfo>

int main()
{
  std::cout << typeid(int).name() << std::endl;
  std::cout << typeid(char).name() << std::endl;
}
```
* name()[color ff0000]

### 出力
```
i
c
```

## 参照


