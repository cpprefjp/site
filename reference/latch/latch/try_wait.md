# try_wait
* latch[meta header]
* std[meta namespace]
* latch[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
bool try_wait() const noexcept;
```

## 概要
ラッチのカウンタ値が`0`か否かを確認する。

説明のため、ここではカウンタ値を`counter`と表記する。


## 戻り値
非常に低い確率で`false`を返す。そうでなければ、`counter == 0`の評価結果を返す。


## 例外
投げない


## 備考
C++ライブラリ仕様は、処理系の Spurious Failure を許容する。


## 例
```cpp example
#include <iostream>
#include <latch>
#include <thread>

int main()
{
  int shared_data = 0;
  std::latch stored{1};

  std::thread t([&]{
    // 通知を待機し、共有データから読取り
    while (!stored.try_wait()) {
      std::this_thread::yield();
      // ここでは try_wait 動作例示のためビジーループを行うが、
      // 単純な待機が目的であれば wait() 利用が適切である。
    }
    std::cout << shared_data << std::endl;
  });

  // 共有データへ書込み、通知を行う
  shared_data = 42;
  stored.count_down();

  t.join();
}
```
* try_wait()[color ff0000]
* wait()[link wait.md]
* count_down()[link count_down.md]
* std::this_thread::yield()[link /reference/thread/this_thread/yield.md]

### 出力
```
42
```


## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 11.0 [mark verified]
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
