# arrive_and_wait
* latch[meta header]
* std[meta namespace]
* latch[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
void arrive_and_wait(ptrdiff_t update = 1);
```
* ptrdiff_t[link /reference/cstddef/ptrdiff_t.md]

## 概要
ラッチのカウンタ値を`update`だけ減算し、呼び出しスレッド自身もカウンタ値が`0`になるまで待機する。


## 効果
次の処理と等価：

```cpp
count_down(update);
wait();
```
* count_down(update)[link count_down.md]
* wait()[link wait.md]


## 戻り値
なし


## 例外
この関数は、以下のerror conditionを持つ[`system_error`](/reference/system_error/system_error.md)例外オブジェクトを送出する可能性がある：

- [`resource_unavailable_try_again`](/reference/system_error/errc.md) : 操作対象のネイティブハンドル型が無効
- [`operation_not_permitted`](/reference/system_error/errc.md) : スレッドにこの操作を行う権限がない
- [`invalid_argument`](/reference/system_error/errc.md) : 実引数が無効


## 例
```cpp example
#include <cassert>
#include <latch>
#include <thread>

// メインスレッドとサブスレッドは"同期ポイント"で互いの進行を待ち合わせる。
// これによりメインスレッドでxに書込んだ値はサブスレッド側で安全に読出せ、
// サブスレッドでyに書込んだ値はメインスレッド側で安全に読出せることが保証される。
// この"同期ポイント"はランデブーポイント(Rendezvous Point)とも呼ばれる。
int main()
{
  int x = 0, y = 0;

  // 同期ポイントを表すラッチ: 初期カウント値=2
  std::latch sync{2};

  // サブスレッドを起動
  std::thread t([&]{
    y = 200;
    sync.arrive_and_wait();  // 同期ポイント
    assert(x == 100);
  });

  // メインスレッド処理
  {
    x = 100;
    sync.arrive_and_wait();  // 同期ポイント
    assert(y == 200);
  }

  t.join();
}
```
* arrive_and_wait()[color ff0000]

### 出力
```
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
- [`count_down()`](count_down.md)
- [`wait()`](wait.md)
