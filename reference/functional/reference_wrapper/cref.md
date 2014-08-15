#cref (C++11)
```cpp
namespace std {
  template <class T> reference_wrapper<const T> cref(const T& t) noexcept;
  template <class T> reference_wrapper<const T> cref(reference_wrapper<T> t) noexcept;
  template <class T> void cref(const T&&) = delete;
}
```

##概要
変数への`const`参照`t`を保持する`reference_wrapper`オブジェクトを生成する


##戻り値
`t`を参照する`reference_wrapper<const T>`オブジェクトを返す。
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

  // 参照ラッパーrは、変数xへのconst参照を保持する
  std::reference_wrapper<const int> r = std::cref(x);

  ++x;

  const int& rx = r.get();
  std::cout << rx << std::endl;
}
```
* cref[color ff0000]

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


