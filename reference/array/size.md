#size(C++11)
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
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md): 9.0 (std::tr1), 10.0, 11.0


##参照

