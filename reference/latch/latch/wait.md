# wait
* latch[meta header]
* std[meta namespace]
* latch[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
void wait() const;
```

## 概要
ラッチのカウンタ値が`0`になるまで待機する。

説明のため、ここではカウンタ値を`counter`と表記する。


## 効果
`counter`が`0`に等しければ即座に制御を戻す。
そうでなければ、`counter`を`0`に減算する[`count_down`](count_down.md)呼び出しが行われるまで、`*this`上で呼び出しスレッドをブロックする。


## 戻り値
なし


## 例外
この関数は、以下のerror conditionを持つ[`system_error`](/reference/system_error/system_error.md)例外オブジェクトを送出する可能性がある：

- [`resource_unavailable_try_again`](/reference/system_error/errc.md) : 操作対象のネイティブハンドル型が無効
- [`operation_not_permitted`](/reference/system_error/errc.md) : スレッドにこの操作を行う権限がない
- [`invalid_argument`](/reference/system_error/errc.md) : 実引数が無効


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
    stored.wait();
    std::cout << shared_data << std::endl;
  });

  // 共有データへ書込み、通知を行う
  shared_data = 42;
  stored.count_down();

  t.join();
}
```
* wait()[color ff0000]
* count_down()[link count_down.md]

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


## 関連項目
- [`count_down()`](count_down.md)
- [`arrive_and_wait()`](arrive_and_wait.md)
