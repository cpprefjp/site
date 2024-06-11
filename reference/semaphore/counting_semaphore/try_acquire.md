# try_acquire
* semaphore[meta header]
* std[meta namespace]
* counting_semaphore[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
bool try_acquire() noexcept;
```

## 概要
カウンティングセマフォのカウンタ値が`0`の場合は何もせず`false`を返し、そうでなければカウンタ値を1つ減算して`true`を返す。

説明のため、ここではカウンタ値を`counter`と表記する。


## 効果
`counter > 0`の場合は、呼び出しスレッドをブロッキングすることなく、アトミックに`counter -= 1`を実行する。
`counter`が減算されなかった場合は、副作用は発生せず`try_acquire`関数は即座に呼び出し元へ戻る。

処理系には、`counter > 0`であっても`counter`の減算に失敗することが許容される。
ただし、セマフォに対する操作が競合していない状況下において、`try_acquire`が一貫して`false`を返すような実装は許容されない。
（Spurious Failure が生じることは滅多にないが、これによりアトミック変数を用いる単純な Compare-and-Exchange ベースの興味深い実装が許容される。）


## 戻り値
`counter`が減算された場合は`true`を返し、そうでなければ`false`を返す。


## 例外
投げない


## 例
```cpp example
#include <iostream>
#include <semaphore>
#include <thread>

int main()
{
  int shared_data = 0;
  std::counting_semaphore sem{0};

  std::thread t([&]{
    // 通知を待機し、共有データから読取り
    while (!sem.try_acquire()) {
      std::this_thread::yield();
      // ここでは try_acquire 動作例示のためビジーループを行うが、
      // セマフォ待機が目的であれば acquire() 利用が適切である。
    }
    std::cout << shared_data << std::endl;
  });

  // 共有データへ書込み、通知を行う
  shared_data = 42;
  sem.release();

  t.join();
}
```
* try_acquire()[color ff0000]
* acquire()[link acquire.md]
* release()[link release.md]
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
