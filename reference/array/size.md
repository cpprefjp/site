#size (C++11)
```cpp
constexpr size_type size() noexcept;
```

##概要
コンテナの要素数を取得する。


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

  std::cout << ar.size() << std::endl;
}
```
* size[color ff0000]


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

