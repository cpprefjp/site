#コンストラクタ
* memory[meta header]
* std[meta namespace]
* weak_ptr[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
constexpr weak_ptr() noexcept;             // (1)
weak_ptr(const weak_ptr& r) noexcept;      // (2)

template <class Y>
weak_ptr(const weak_ptr<Y>& r) noexcept;   // (3)

template <class Y>
weak_ptr(const shared_ptr<Y>& r) noexcept; // (4)

weak_ptr(weak_ptr&& r) noexcept;           // (5) C++14

template <class Y>
weak_ptr(weak_ptr<Y>&& r) noexcept;        // (6) C++14
```
* shared_ptr[link /reference/memory/shared_ptr.md]


##weak_ptrオブジェクトの構築
- (1) : デフォルトコンストラクタ。監視対象を持たない、空の`weak_ptr`オブジェクトを構築する。
- (2) : コピーコンストラクタ。監視対象をコピーする。
- (3) : 変換可能な`weak_ptr`の監視対象をコピーする。
- (4) : [`shared_ptr`](/reference/memory/shared_ptr.md)オブジェクト`r`を監視する。
- (5) : ムーブコンストラクタ。監視対象を`r`から`*this`に移動する。
- (6) : 変換可能な`weak_ptr`からのムーブコンストラクタ。監視対象を`r`から`*this`に移動する。

##要件
- (3), (4), (6) : `Y*`が`T*`に暗黙変換可能であること。そうでない場合、これらはオーバーロード解決の候補から外れる。


##効果
- (1) : 監視対象を持たない、空の`weak_ptr`オブジェクトを構築する。
- (2), (3) : `r`が空である場合、空の`weak_ptr`オブジェクトを構築する。そうでなければ、`r`の監視対象を`*this`にコピーする。
- (4) : `r`を`*this`の監視対象とする。
- (5), (6) : `r`の監視対象を`*this`に移動する。


##事後条件
- (1) : [`use_count()`](use_count.md) `== 0`
- (2), (3), (4) : [`use_count()`](use_count.md) `==` `r.`[`use_count()`](use_count.md)
- (5), (6) : `r.`[`use_count()`](use_count.md) `== 0`


##例
```cpp
#include <cassert>
#include <iostream>
#include <memory>

int main()
{
  // (1)
  // 監視対象を持たない、空のweak_ptrオブジェクトを構築する。
  std::weak_ptr<int> wp1;
  assert(wp1.use_count() == 0);

  // (2)
  // 他のweak_ptrオブジェクトの監視対象をコピーする
  std::shared_ptr<int> sp2(new int(3));
  std::weak_ptr<int> wp2_org = sp2; // wp2_orgはsp2を監視する
  std::weak_ptr<int> wp2 = wp2_org; // wp2_orgの監視対象をコピーする

  if (std::shared_ptr<int> r = wp2.lock()) {
    std::cout << *r << std::endl;
  }

  // (3)
  // 変換可能なweak_ptrオブジェクトの監視対象をコピーする
  std::shared_ptr<int> sp3(new int(3));
  std::weak_ptr<int> wp3_org = sp3;
  std::weak_ptr<void> wp3 = wp3_org;

  if (std::shared_ptr<int> r = std::static_pointer_cast<int>(wp3.lock())) {
    std::cout << *r << std::endl;
  }

  // (4)
  // shared_ptrオブジェクトを監視する
  std::shared_ptr<int> sp4(new int(3));
  std::weak_ptr<int> wp4 = sp4;

  if (std::shared_ptr<int> r = wp4.lock()) {
    std::cout << *r << std::endl;
  }
    
  // (5)
  // weak_ptrオブジェクトの監視対象を移動する
  std::shared_ptr<int> sp5(new int(3));
  std::weak_ptr<int> wp5_org = sp5;
  std::weak_ptr<int> wp5 = std::move(wp5_org);

  if (std::shared_ptr<int> r = wp5.lock()) {
    std::cout << *r << std::endl;
  }

  // (6)
  // 変換可能なweak_ptrオブジェクトの監視対象を移動する
  std::shared_ptr<int> sp6(new int(3));
  std::weak_ptr<int> wp6_org = sp6;
  std::weak_ptr<void> wp6 = std::move(wp6_org);

  if (std::shared_ptr<int> r = std::static_pointer_cast<int>(wp6.lock())) {
    std::cout << *r << std::endl;
  }
}
```

###出力
```
3
3
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

##参照
- [LWG Issue 2315. `weak_ptr` should be movable](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2315)
