#swap (非メンバ関数)
* memory[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T>
  void swap(weak_ptr<T>& a, weak_ptr<T>& b) noexcept;
}
```

##概要
2つの`weak_ptr`オブジェクトを入れ替える。


##効果
`a.`[`swap`](./swap.md)`(b)`


##戻り値
なし


##例外
投げない


##例
```cpp
#include <iostream>
#include <memory>

int main()
{
  std::shared_ptr<int> sp1(new int(1));
  std::weak_ptr<int> wp1 = sp1;

  std::shared_ptr<int> sp2(new int(2));
  std::weak_ptr<int> wp2 = sp2;

  // wp1とwp2を入れ替える
  std::swap(wp1, wp2);

  if (std::shared_ptr<int> r = wp1.lock()) {
	std::cout << *r << std::endl;
  }

  if (std::shared_ptr<int> r = wp2.lock()) {
	std::cout << *r << std::endl;
  }
}
```

###出力
```
2
1
```

##バージョン
###言語
- C++11

###処理系
- [GCC, C++11 mode](/implementation.md#gcc): 4.3.6
- [Clang libc++, C++11 mode](/implementation.md#clang): 3.0
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): ?
