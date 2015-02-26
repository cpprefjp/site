#ref (C++11)
* functional[meta header]
* std[meta namespace]
* reference_wrapper[meta class]
* function[meta id-type]

```cpp
namespace std {
  template <typename T> reference_wrapper<T> ref(T& t) noexcept;
  template <typename T> reference_wrapper<T> ref(reference_wrapper<T> t) noexcept;

  template <class T> void ref(const T&&) = delete;
}
```

##概要
変数への参照tを保持する`reference_wrapper`オブジェクトを生成する


##戻り値
`t`を参照する`reference_wrapper<T>`オブジェクトを返す。
ただし、`t`の型が`reference_wrapper`である場合はそのまま返す。


##例外
投げない


##例
```cpp
#include <iostream>
#include <functional>

int main()
{
  int x = 3;

  // 参照ラッパーrは、変数xへの参照を保持する
  std::reference_wrapper<int> r = std::ref(x);
  ++x;

  std::cout << r.get() << std::endl;
}
```
* ref[color ff0000]

###出力
```
4
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++0x mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) ??


##参照


