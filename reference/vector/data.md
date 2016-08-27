#data
* vector[meta header]
* std[meta namespace]
* vector[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
T* data() noexcept;
const T* data() const noexcept;
```

##効果
配列の先頭へのポインタを返す。

`vector`が空の場合であっても、この関数の呼び出し自体は問題なく行える。ただし、その戻り値については規定されていないため、間接参照を行うと未定義動作になる。

##戻り値
`[data(), data() + size())` が適正な範囲になるようなポインタ。

空ではない`vector`に対しては`data() == &front()`となる。

##計算量
定数時間


##例
```cpp
#include <iostream>
#include <vector>

int main()
{
  std::vector<int> v = {3, 1, 4};

  int* p = v.data();

  std::cout << *p << std::endl;

  ++p;
  std::cout << *p << std::endl;
}
```
* data[color ff0000]

###出力
```
3
1
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [GCC, C++11 mode](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 10.0, 11.0, 12.0


###備考
gcc 4.8.2 の時点で libstdc++ の実装にはバグがあり、`vector` が空の場合に `data()` を呼び出すと未定義動作になる。([Bug 59829](https://gcc.gnu.org/bugzilla/show_bug.cgi?id=59829))


##参照
- [LWG Issue 464. Suggestion for new member functions in standard containers](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#464)
