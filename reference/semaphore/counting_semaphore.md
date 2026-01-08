# counting_semaphore
* semaphore[meta header]
* class template[meta id-type]
* std[meta namespace]
* cpp20[meta cpp]
* binary_semaphore[meta alias]

```cpp
namespace std {
  template<ptrdiff_t least_max_value = implementation-defined>
  class counting_semaphore;

  using binary_semaphore = counting_semaphore<1>;
}
```
* ptrdiff_t[link /reference/cstddef/ptrdiff_t.md]

## 概要
`counting_semaphore`クラスは、スレッド間で使用する共有リソースへの並行アクセスを制約する、軽量な同期プリミティブである。

カウンティングセマフォ（または単にセマフォ）は他の同期プリミティブを実装するための部品として広く用いられ、セマフォと条件変数のいずれも適用可能なケースでは[`condition_variable`](/reference/condition_variable/condition_variable.md)よりも効率的である。

セマフォは1つのカウンタで状態管理される同期プリミティブとみなせる。カウンタは`0`以上かつ[`max()`](counting_semaphore/max.md)以下の値をとり、このカウンタ値がセマフォで管理する共有リソースの個数と解釈される。

- カウンタの最大値はテンプレートパラメータ`least_max_value`にて設定する。省略時は処理系がサポートする最大値が設定される。
- カウンタの初期値は[コンストラクタ](counting_semaphore/op_constructor.md)でセマフォ構築時に指定する。
- [`release()`](counting_semaphore/release.md)メンバ関数呼び出しによりカウンタ値の加算と通知処理、つまり利用可能な共有リソースの増加を表現する。（歴史的にはオランダ語由来の"V操作"と呼ばれる。英語では"up"／"signal"／"post"とも呼ばれる。）
- [`acquire()`](counting_semaphore/acquire.md)メンバ関数呼び出しにより待機処理とカウンタ値の減算、つまり利用可能な共有リソースの減少を表現する。（同様に"P操作"や"down"／"wait"／"pend"とも呼ばれる。）

カウンティングセマフォの最大値を`1`としたものはバイナリセマフォと呼ばれ、ヘッダ[`<semaphore>`](/reference/semaphore.md)ではエイリアス型`binary_semaphore`として定義される。
バイナリセマフォはミューテックス（[`mutex`](/reference/mutex/mutex.md)など）と同様に共有リソースの排他制御を実現する同期プリミティブだが、ミューテックスとは異なりスレッドがロックを所有(own)するという概念が存在しない。
このためバイナリセマフォでは、あるスレッド上でカウンタ値を減少（1→0; `lock`相当）させ、別のスレッド上でカウンタ値を増加（0→1; `unlock`相当）させてもよい。


## 適格要件
テンプレートパラメータ`least_max_value`には非負の数値を指定する。


## メンバ関数
### 構築・破棄

| 名前             | 説明            | 対応バージョン |
|-----------------|----------------|------------|
| [`(constructor)`](counting_semaphore/op_constructor.md) | コンストラクタ | C++20 |
| `(destructor)` | デストラクタ | C++20 |
| `operator=(const counting_semaphore&) = delete;` | 代入演算子 | C++20 |
| [`release`](counting_semaphore/release.md) | カウンタ値を加算し、待機中スレッドをブロック解除する | C++20 |
| [`acquire`](counting_semaphore/acquire.md) | カウンタ値が`0`より大きくなるまで待機し、カウンタ値を1つ減算する | C++20 |
| [`try_acquire`](counting_semaphore/try_acquire.md) | カウンタ値の1減算を試みる | C++20 |
| [`try_acquire_for`](counting_semaphore/try_acquire_for.md) | 相対時間のタイムアウトを指定して、カウンタ値の1減算を試みる | C++20 |
| [`try_acquire_until`](counting_semaphore/try_acquire_until.md) | 絶対時間のタイムアウトを指定して、カウンタ値の1減算を試みる | C++20 |

## 静的メンバ関数

| 名前             | 説明            | 対応バージョン |
|-----------------|----------------|----------|
| [`max`](counting_semaphore/max.md) | カウンタの最大値 | C++20 |


## 例
```cpp example
#include <iostream>
#include <semaphore>
#include <thread>
#include <queue>

int main()
{
  // アイテム在庫
  std::queue<int> stock;

  // 在庫管理カウンティングセマフォ（初期値=0／最大値=3）
  std::counting_semaphore<3> token{0};
  // 在庫アクセス保護バイナリセマフォ（初期値=1／最大値=1）
  std::counting_semaphore<1> guard{1};
  // 説明のためテンプレートパラメータleast_max_valueを明示指定しているが、
  // 両者ともstd::counting_semaphore<>と省略しても正しく動作する。

  // 生産者スレッド
  std::thread producer([&]{
    for (int i = 1; i <= 3; i++) {
      // 新しいアイテムを生産
      int item = i * 100;
      // アイテム在庫へ追加
      guard.acquire();
      stock.push(item);
      guard.release();
      // 在庫管理カウントを+1する
      token.release();
    }
  });

  // 消費者スレッド
  std::thread consumer([&]{
    for (int i = 1; i <= 3; i++) {
      // 在庫生産されるまで待機し、在庫管理カウントを-1する
      token.acquire();
      // アイテム在庫から取出
      guard.acquire();
      int item = stock.front();
      stock.pop();
      guard.release();
      // アイテムを消費
      std::cout << item << std::endl;
    }
  });

  producer.join();
  consumer.join();
  return 0;
}
```
* std::counting_semaphore[color ff0000]
* release()[link counting_semaphore/release.md]
* acquire()[link counting_semaphore/acquire.md]
* std::queue[link /reference/queue/queue.md]
* stock.push[link /reference/queue/queue/push.md]
* stock.pop()[link /reference/queue/queue/pop.md]
* join()[link /reference/thread/thread/join.md]

### 出力
```
100
200
300
```


## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 11.0 [mark verified]
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`<condition_variable>`](/reference/condition_variable.md)
- [`<mutex>`](/reference/mutex.md)


## 参照
- [semop, semtimedop - System V セマフォの操作](https://web.archive.org/web/20230605023712/https://linuxjm.osdn.jp/html/LDP_man-pages/man2/semop.2.html)
- [sem_overview - POSIX セマフォの概要](https://web.archive.org/web/20230611015117/https://linuxjm.osdn.jp/html/LDP_man-pages/man7/sem_overview.7.html)
- [Windows, Semaphore Objects](https://docs.microsoft.com/en-us/windows/win32/sync/semaphore-objects)
- [macOS/iOS, Dispatch Semaphore](https://developer.apple.com/documentation/dispatch/dispatch_semaphore)
