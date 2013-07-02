#get(C++11)
```cpp
namespace std {
  template <size_t I, class T, size_t N>
  T& get(array<T, N>& x) noexcept;

  template <size_t I, class T, size_t N>
  T&& get(array<T, N>&& x) noexcept;

  template <size_t I, class T, size_t N>
  const T& get(const array<T, N>& x) noexcept;
}
```

##概要
タプルと見なせる型から指定した位置の要素を取得する。
`<array>`ヘッダでは、`array`クラスに関するオーバーロードを定義する。


##要件
`I < N`であること。`I`が`array`の要素数以上である場合、プログラムは不適格である。


##戻り値
`x[I]`


##例外
投げない


##計算量
定数時間


##例
```cpp
#include <cassert>
#include <array>
#include <utility> // std::move

int main()
{
  // 非const左辺値参照版
  {
    std::array<int, 3> ar = {3, 1, 4};
    int& front = std::get<0>(ar); // 先頭要素を取得する
    int& back = std::get<2>(ar);  // 最後尾要素を取得する

    assert(front == 3);
    assert(back == 4);
  }

  // 右辺値参照版
  {
    std::array<int, 3> ar = {3, 1, 4};
    int front = std::get<0>(std::move(ar));

    assert(front == 3);
  }

  // const左辺値参照版
  {
    const std::array<int, 3> ar = {3, 1, 4};
    const int& front = std::get<0>(ar);
    const int& back = std::get<2>(ar);

    assert(front == 3);
    assert(back == 4);
  }
}
```
* get[color ff0000]


###出力
```
```


##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) ??

####備考
GCC 4.7の`std::get()`は、`I`の境界チェックがない。


##参照

