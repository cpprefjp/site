# jthread
* thread[meta header]
* std[meta namespace]
* class[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  class jthread;
}
```

## 概要
クラス`jthread`は、[`thread`](thread.md)と同じく、新しい実行のスレッド(thread of execution)（以下、単にスレッドとする）の作成／待機／その他操作を行う機構を提供する。このクラスはさらに、実行しているスレッドに対する停止要求を扱う機能や、自動で[`join`](jthread/join.md)操作を行う機能を提供する。

## `thread`クラスとの違い

- 停止要求のサポート: `jthread`は自身と関連付けられたスレッドに対する停止要求を扱う仕組みを提供する。このために[`<stop_token>`](/reference/stop_token.md)ヘッダに定義されたクラスを利用する。
- 自動join機能: `jthread`はデストラクタやムーブ代入演算子が呼び出されたとき、もし自身に関連付けられたスレッドが存在する場合は、スレッドの停止要求を作成し、その後[`join()`](jthread/join.md)を呼び出してスレッドの終了を待機する。そのため`thread`クラスと異なり、[`joinable()`](jthread/joinable.md) `==` `true` であってもデストラクタやムーブ代入演算子を呼び出し可能であり、[`std::terminate()`](/reference/exception/terminate.md)は呼び出されない。

## メンバ関数

| 名前 | 説明 | 対応バージョン |
|----------------------------------------------|--------------------------------------------------------------------|-------|
| [`(constructor)`](jthread/op_constructor.md) | コンストラクタ | C++20 |
| [`(destructor)`](jthread/op_destructor.md)   | デストラクタ | C++20 |
| [`operator=`](jthread/op_assign.md)          | 代入演算子 | C++20 |
| [`swap`](jthread/swap.md)                    | 別の`jthread`と交換する | C++20 |
| [`joinable`](jthread/joinable.md)            | スレッドに関連付けられているか否かを取得する | C++20 |
| [`join`](jthread/join.md)                    | スレッドが終了するまで待機する | C++20 |
| [`detach`](jthread/detach.md)                | スレッドの管理を手放す | C++20 |
| [`get_id`](jthread/get_id.md)                | 関連付けられているスレッドのスレッド識別子を取得する | C++20 |
| [`native_handle`](jthread/native_handle.md)  | スレッドに関連付けられたネイティブハンドルを取得する［処理系定義］ | C++20 |
| [`get_stop_source`](jthread/get_stop_source.md) | 停止要求を作成するための[`stop_source`](/reference/stop_token/stop_source.md)オブジェクトを取得する | C++20 |
| [`get_stop_token`](jthread/get_stop_token.md) | 停止状態を問い合わせるための[`stop_token`](/reference/stop_token/stop_token.md)オブジェクトを取得する | C++20 |
| [`request_stop`](jthread/request_stop.md) | スレッドに対する停止要求を作成する | C++20 |

## 静的メンバ関数

| 名前 | 説明 | 対応バージョン |
|------------------------------------------------------------|----------------------------------------------------|-------|
| [`hardware_concurrency`](jthread/hardware_concurrency.md) | 処理系によりサポートされるスレッド並行数を取得する | C++20 |


## メンバ型

| 名前 | 説明 | 対応バージョン |
|------------------------|----------------------------------------------|-------|
| [`id`](jthread/id.md) | スレッド識別子 (type-alias) | C++20 |
| `native_handle_type`  | ネイティブハンドル型 (type-alias)［処理系定義］ | C++20 |
| [`name_hint`](thread/name_hint.md) | スレッド名を設定するスレッド属性。`thread::name_hint`の別名 (type-alias) | C++29 |
| [`stack_size_hint`](thread/stack_size_hint.md) | スレッドのスタックサイズを設定するスレッド属性。`thread::stack_size_hint`の別名 (type-alias) | C++29 |


## 非メンバ関数

| 名前 | 説明 | 対応バージョン |
|---------------------------------|---------------------------------------|-------|
| [`swap`](jthread/swap_free.md) | 2つの`jthread`オブジェクトを入れ替える | C++20 |


## 備考
- 型`native_handle_type`およびメンバ関数`native_handle`について、同メンバの存在有無およびその意味は処理系定義となる。
- 型`id`および型`native_handle_type`は、`thread`クラスで定義しているものと同じものを使用する。

## 例
### 基本的な使い方
```cpp example
#include <iostream>
#include <cstdint>
#include <thread>
#include <chrono>

std::uint64_t sum1 = 0;
std::uint64_t sum2 = 0;

void f1(std::stop_token stoken, std::uint64_t n)
{
  sum1 = 0;
  for (std::uint64_t i = 1; i < n; ++i) {
    if (stoken.stop_requested()) {
      // 中断リクエストがきたのでスレッドを終了する
      break;
    }
    sum1 += i;
  }
}

void f2(std::uint64_t n)
{
  sum2 = 0;
  for (std::uint64_t i = 1; i < n; ++i) {
    sum2 += i;
  }
}

int main()
{
  {
    // 関数の第1引数がstd::stop_token型である場合、
    // スレッドに中断リクエストを送れるようになる
    std::jthread jt1 {f1, 1'000'000};
    std::this_thread::sleep_for(std::chrono::milliseconds{3});
    jt1.request_stop(); // スレッドの中断要求を発行

    // スレッド実行する関数がstd::stop_tokenを受け取らない場合、
    // 中断リクエストを使用せず、
    // デストラクタで自動的にjoinするスレッドオブジェクトとして使用する
    std::jthread jt2 {
      [] { f2(1'000'000); }
    };
  } // jthreadのデストラクタでは、中断要求を発行し、スレッドの終了を待機する

  std::cout << sum1 << std::endl; // 計算できたところまで表示
  std::cout << sum2 << std::endl;
}
```
* std::stop_token[link /reference/stop_token/stop_token.md]
* stoken.stop_requested()[link /reference/stop_token/stop_token/stop_requested.md]
* jt1.request_stop()[link jthread/request_stop.md]


#### 出力例
```
48458670270
499999500000
```


### stop_callbackと組み合わせる例
```cpp example
#include <cassert>
#include <thread>
#include <stop_token>

int main()
{
  int x = 0, y = 0;

  std::jthread jt([&](std::stop_token st) { x++; });

  // スレッドに対する停止要求の作成に合わせて呼び出される
  // コールバックを定義する。
  std::stop_callback sc { jt.get_stop_token(), [&] { y++; }};

  assert(y == 0);

  // 明示的にjoin()を呼び出さずにtを上書きする。
  // このとき、ムーブ代入演算子の呼び出しの中で、
  // 自動で停止要求の作成とjoin()の呼び出しが行われる。
  jt = std::jthread{};

  assert(x == 1 && y == 1);

  return 0;
}
```
* std::jthread[color ff0000]
* std::stop_token[link /reference/stop_token/stop_token.md]
* std::stop_callback[link /reference/stop_token/stop_callback.md]
* get_stop_token()[link jthread/get_stop_token.md]

#### 出力
```
```

### 名前とスタックサイズを設定する - POSIX環境 (C++29)
```cpp
#include <thread>
#include <iostream>
#include <pthread.h> // POSIX環境

void work(int n)
{
  // ...
}

int main()
{
  // スレッド名とスタックサイズのヒントを指定してスレッドを生成する。
  // スレッド名はデバッガのスレッド一覧などに表示される
  std::jthread t{
    std::jthread::name_hint("Worker"),
    std::jthread::stack_size_hint(512 * 1024),
    work,
    42
  };

  // 標準ライブラリにスレッド名を取得するAPIはないが、
  // ネイティブハンドルを通じてプラットフォームのAPIで取得できる
  char name[16]{};
  pthread_getname_np(t.native_handle(), name, sizeof(name));
  std::cout << name << std::endl;
}
```
* std::jthread::name_hint[link thread/name_hint.md]
* std::jthread::stack_size_hint[link thread/stack_size_hint.md]
* t.native_handle()[link jthread/native_handle.md]

#### 出力例
```
Worker
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 10.2.0 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P2019R9 Thread attributes](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2026/p2019r9.pdf)
    - C++29で、スレッド名を設定する[`name_hint`](thread/name_hint.md)とスタックサイズを設定する[`stack_size_hint`](thread/stack_size_hint.md)のスレッド属性が追加された
