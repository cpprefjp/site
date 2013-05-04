#初期化
```cpp
namespace std {
  template <class T, size_t N >
  struct array {
    T elems[N]; // public。変数名は実装依存。

    // コンストラクタの定義なし
  };
}
```

##概要
`array`クラスは、固定長配列のコンテナである。静的に決定される要素数を持ち、組み込み配列のラッパーとして実装される。
`array`クラスは`public`な配列メンバ変数を持ち、非自明なコンストラクタを提供しない。そのため、`array`は集成体の要件を満たす。これにより、`array`クラスは組み込み配列と同様の初期化構文を使用して初期化を行うことができる。


##例
```cpp
#include <iostream>
#include <array>

int main()
{
  // int型を3要素持つ配列型オブジェクトの初期値を設定
  std::array<int, 3> ar = {1, 2, 3};

  for (std::size_t i = 0; i < ar.size(); ++i) {
    std::cout << ar[i] << std::endl;
  }
}
```
* {1, 2, 3}[color ff0000]


###出力
```
1
2
3
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0
- [ICC](/implementation#icc.md): 
- [Visual C++](/implementation#visual_cpp.md) 9.0, 10.0

##参照


