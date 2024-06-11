# release
* semaphore[meta header]
* std[meta namespace]
* counting_semaphore[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
void release(ptrdiff_t update = 1);
```
* ptrdiff_t[link /reference/cstddef/ptrdiff_t.md]

## 概要
カウンティングセマフォのカウンタ値に`update`を加算し、待機中スレッドのブロック解除を行う。

説明のため、ここではカウンタ値を`counter`と表記する。


## 事前条件
`update >= 0` かつ `update <=` [`max()`](max.md) `- counter`


## 効果
アトミックに`counter += update`を実行し、`counter`が値`0`より大きくなるまで待機中のスレッド群をブロック解除する。


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
#include <semaphore>
#include <thread>

int main()
{
  int shared_data = 0;
  std::counting_semaphore sem{0};

  std::thread t([&]{
    // 通知を待機し、共有データから読取り
    sem.acquire();
    std::cout << shared_data << std::endl;
  });

  // 共有データへ書込み、通知を行う
  shared_data = 42;
  sem.release();

  t.join();
}
```
* release()[color ff0000]
* acquire()[link acquire.md]

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
