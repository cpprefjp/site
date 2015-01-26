#name (C++11)
```cpp
const char* name() const;          // C++11
const char* name() const noexcept; // C++14
```

##概要
型名を表す文字列を返す


##戻り値
`target->name()`

※`target`は、`type_index`のメンバ変数として保持されている`type_info`オブジェクトへのポインタ(説明用)


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
* name[color ff0000]

###出力例
```
i
d
c
```

##バージョン
###言語
- C++11

###処理系
- [GCC, C++0x mode](/implementation.md#gcc): 4.6.1


##参照
- [LWG Issue 2144. Missing `noexcept` specification in `type_index`](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2144)

