# notify_all
* atomic[meta header]
* std[meta namespace]
* atomic[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
void notify_all() volatile noexcept; // (1) C++20
void notify_all() noexcept;          // (2) C++20
```

## 概要
待機している全てのスレッドを起床させる。

この関数は、[`wait()`](wait.md)関数によるブロッキング待機を解除する。


## テンプレートパラメータ制約
- (1) :
    - C++20 : `atomic<T>::is_always_lock_free`が`true`であること


## 効果
起床待機している全てのアトミックオブジェクトの待機を解除する


## 戻り値
なし


## 例外
投げない


## 例
```cpp example
#include <iostream>
#include <atomic>
#include <thread>

int main()
{
  std::atomic<bool> x {false};

  auto f = [&x] {
    while (true) {
      x.wait(false);
      if (x.load() == true) {
        break;
      }
    }
  };

  std::thread t1 {f};
  std::thread t2 {f};

  x.store(true);
  x.notify_all();

  t1.join();
  t2.join();
}
```
* notify_all()[color ff0000]
* load[link load.md]
* store[link store.md]
* wait[link wait.md]

### 出力
```
```


## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 9.0 [mark noimpl]
- [GCC](/implementation.md#gcc): 9.2 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark noimpl]


## 関連項目
- [C++20 ほとんどの`volatile`を非推奨化](/lang/cpp20/deprecating_volatile.md)


## 参照
- [P0514R4 Efficient concurrent waiting for C++20](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0514r4.pdf)
- [ogiroux/atomic_wait - Sample implementation of C++20 atomic_wait/notify](https://github.com/ogiroux/atomic_wait)
- [P1831R1 Deprecating `volatile`: library](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2020/p1831r1.html)
    - C++20での、`volatile`版への制約追加
