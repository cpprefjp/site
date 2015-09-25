#swap (非メンバ関数)
* memory[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T, class D>
  void swap(unique_ptr<T, D>& a, unique_ptr<T, D>& b) noexcept;
}
```

##概要
2つの`unique_ptr`オブジェクトを入れ替える。


##効果
`a.`[`swap`](./swap.md)`(b);`


##戻り値
なし


##例
```cpp
#include <iostream>
#include <memory>

int main()
{
  std::unique_ptr<int> a(new int(3));
  std::unique_ptr<int> b(new int(1));

  // aとbを入れ替える
  std::swap(a, b);

  std::cout << *a << std::endl;
  std::cout << *b << std::endl;
}
```

###出力
```
1
3
```

##バージョン
###言語
- C++11

###処理系
- [GCC](/implementation.md#gcc): 4.4.7
- [Clang libc++, C++11 mode](/implementation.md#clang): 3.0
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 10.0, 11.0, 12.0
