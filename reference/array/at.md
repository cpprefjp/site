#at(C++11)
```cpp
const_reference at(size_type n) const;
reference at(size_type n);
```

##概要
n番目の要素を参照する。


##戻り値
`a.at(n)`は`n`番目の要素への参照を返す。もし、`a`が`const`だった場合には、`n`番目の要素への`const`参照を返す。


##例外
`n >= a.`[`size()`](/reference/array/size.md)だった場合には[`out_of_range`](/reference/stdexcept.md)例外を投げる。


##計算量
定数時間


##備考
`a.at(n)` は `*(a.`[`begin()`](/reference/array/begin.md)` + n)` と同じ結果になる。


##例
```cpp
#include <iostream>
#include <array>

int main()
{
  std::array<int, 3> ar = {3, 1, 4};
  const std::array<int, 3>& car = ar;

  int& a = ar.at(2);
  const int& b = car.at(2);

  std::cout << a << std::endl;
  std::cout << b << std::endl;

  try {
    ar.at(999); // 範囲外アクセス
  }
  catch (std::out_of_range& e) {
    std::cout << "out of range" << std::endl;
  }
}
```
* at[color ff0000]


###出力
```
4
4
out of range
```


##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md): 9.0 (std::tr1), 10.0, 11.0


##参照


