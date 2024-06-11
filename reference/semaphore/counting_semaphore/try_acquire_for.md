# try_acquire_for
* semaphore[meta header]
* std[meta namespace]
* counting_semaphore[meta class]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
template<class Rep, class Period>
  bool try_acquire_for(const chrono::duration<Rep, Period>& rel_time);
```

## 概要
カウンティングセマフォのカウンタ値が`0`より大きくなるまで待機し、カウンタ値を1つ減算してから`true`を返す。
相対時間で指定されるタイムアウトが発生した場合は`false`を返す。

説明のため、ここではカウンタ値を`counter`と表記する。


## 効果
次のステップを繰り返す：

- [`try_acquire`](try_acquire.md)を評価し、その結果が`true`ならば`true`を返す。
- `counter`が`0`より大きくなる、または指定された相対時間が経過するまで、`*this`上で関数呼び出しスレッドをブロッキングする。タイムアウトが発生した場合は`false`を返す。


## 戻り値
カウンタ値を減算できた場合は`true`を返す。タイムアウトが発生した場合は`false`を返す。


## 例外
この関数はタイムアウト関連の例外オブジェクト、もしくは以下のerror conditionを持つ[`system_error`](/reference/system_error/system_error.md)例外オブジェクトを送出する可能性がある：

- [`resource_unavailable_try_again`](/reference/system_error/errc.md) : 操作対象のネイティブハンドル型が無効
- [`operation_not_permitted`](/reference/system_error/errc.md) : スレッドにこの操作を行う権限がない
- [`invalid_argument`](/reference/system_error/errc.md) : 実引数が無効


## 例
```cpp example
#include <chrono>
#include <iostream>
#include <semaphore>
#include <thread>

int main()
{
  int shared_data = 0;
  std::counting_semaphore sem{0};

  std::thread t([&]{
    // 通知を待機し、共有データから読取り
    constexpr auto duration = std::chrono::seconds{5};
    if (sem.try_acquire_for(duration)) {
      std::cout << shared_data << std::endl;
    } else {
      std::cout << "(timed out)" << std::endl;
    }
  });

  // 共有データへ書込み、通知を行う
  shared_data = 42;
  sem.release();

  t.join();
}
```
* try_acquire_for[color ff0000]
* release()[link release.md]

### 出力例
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
