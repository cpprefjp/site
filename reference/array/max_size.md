#max_size (C++11)
* array[meta header]
* std[meta namespace]
* array[meta class]

```cpp
constexpr size_type max_size() noexcept;       // C++11
constexpr size_type max_size() const noexcept; // C++14
```

##概要
確保可能な最大の要素数を取得する


##戻り値
`array`クラスのテンプレートパラメータである`N`定数を返す。


##例外
投げない


##計算量
定数時間


##例
```cpp
#include <iostream>
#include <array>

int main()
{
  std::array<int, 3> ar = {1, 2, 3};

  std::cout << ar.max_size() << std::endl;
}
```
* max_size[color ff0000]


###出力
```
3
```


##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++0x mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 9.0 (std::tr1), 10.0, 11.0


##参照
- [N3669 Fixing constexpr member functions without const](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3669.pdf)

