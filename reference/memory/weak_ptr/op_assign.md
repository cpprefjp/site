#operator= (C++11)
```cpp
weak_ptr& operator=(const weak_ptr& r) noexcept;      // (1)

template <class Y>
weak_ptr& operator=(const weak_ptr<Y>& r) noexcept;   // (2)

template <class Y>
weak_ptr& operator=(const shared_ptr<Y>& r) noexcept; // (3)
```

##概要
- (1) : `*this`の現在の監視を停止し、`r`の監視対象を新たに監視する。
- (2) : `*this`の現在の監視を停止し、変換可能な`weak_ptr`オブジェクト`r`の監視対象を新たに監視する。
- (3) : `*this`の現在の監視を停止し、新たに`r`を監視する。


##効果
[`weak_ptr`](./weak_ptr.md)`(r).`[`swap`](./swap.md)`(*this)`と同等の効果を持つ。


##戻り値
`*this`


##例外
投げない


##例
```cpp
#include <cassert>
#include <iostream>
#include <memory>

int main()
{
  // (1)
  // 他のweak_ptrオブジェクトの監視対象を、新たに監視する
  std::shared_ptr<int> sp1(new int(3));
  std::weak_ptr<int> wp1_org = sp1; // wp1_orgはsp1を監視する
  std::weak_ptr<int> wp1;
  wp1 = wp1_org; // wp1はwp1_orgの監視対象を監視する

  if (std::shared_ptr<int> r = wp1.lock()) {
    std::cout << *r << std::endl;
  }

  // (2)
  // 他の変換可能なweak_ptrオブジェクトの監視対象を、新たに監視する
  std::shared_ptr<int> sp2(new int(3));
  std::weak_ptr<int> wp2_org = sp2;
  std::weak_ptr<void> wp2;
  wp2 = wp2_org;

  if (std::shared_ptr<int> r = std::static_pointer_cast<int>(wp2.lock())) {
    std::cout << *r << std::endl;
  }

  // (3)
  // shared_ptrオブジェクトを新たに監視する
  std::shared_ptr<int> sp3(new int(3));
  std::weak_ptr<int> wp3;
  wp3 = sp3;

  if (std::shared_ptr<int> r = wp3.lock()) {
    std::cout << *r << std::endl;
  }
}
```

###出力
```
3
3
3
```

##バージョン
###言語
- C++11

###処理系
- [GCC, C++11 mode](/implementation.md#gcc): 4.3.6
- [Clang libc++, C++11 mode](/implementation.md#clang): 3.0
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): ?
