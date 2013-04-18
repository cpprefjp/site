#operator==
```cpp
namespace std {
  template<class... TTypes, class... UTypes>
  bool operator==(const tuple<TTypes...>& t, const tuple<UTypes...>& u);
}
```
* tuple[link /reference/tuple/tuple.md]

##概要

<b>2つの[tuple](/reference/tuple/tuple.md)オブジェクトの等値比較を行う。</b>


##要件

2つの[tuple](/reference/tuple/tuple.md)オブジェクトの要素数が同じであること。
[tuple](/reference/tuple/tuple.md)の要素`std::[get](/reference/tuple/tuple/get.md)<i>(t)`と`std::[get](/reference/tuple/tuple/get.md)<i>(u)`において、すべての要素の比較 `std::[get](/reference/tuple/tuple/get.md)<i>(t) == std::[get](/reference/tuple/tuple/get.md)<i>(u)` の比較結果が`bool`に変換可能な型であること。

<b>効果</b>
0番目の要素から順に等値比較を行う。

##戻り値

[`tuple`](/reference/tuple/tuple.md)の全ての要素を`std::[get](/reference/tuple/tuple/get.md)<i>(t) ==std::[get](/reference/tuple/tuple/get.md)<i>(u)` した結果がtrueである場合`true`を返し、そうでなければ`false`を返す。


##例

```cpp
#include <iostream>
#include <tuple>
#include <string>

int main()
{
  std::tuple<int, char, const char*> t1(1, 'a', "hello");
  std::tuple<int, char, std::string> t2(1, 'a', "hello");
  std::tuple<int, char, std::string> t3(1, 'a', "hellot");

  std::cout << std::boolalpha;
  {
    bool result = t1 == t2; // ※型は異なっていてもかまわない
    std::cout << result << std::endl;
  }
  {
    bool result = t1 == t3;
    std::cout << result << std::endl;
  }
}
```
* ==[color ff0000]
* ==[color ff0000]

###出力

```cpp
true
false
```

##バージョン


###言語


- C++11



###処理系

- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.6.1
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) ??<h4>備考</h4>
(処理系やライブラリのバグや不完全な実装などをここに書く。なければ備考欄を削除)



##実装例

```cpp
```

##参照
```