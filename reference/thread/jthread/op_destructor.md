# デストラクタ
* thread[meta header]
* std[meta namespace]
* jthread[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
~jthread();
```

## 概要
`jthread`オブジェクトを破棄する。


## 効果
[`joinable`](joinable.md)が`true`である場合、[`request_stop()`](request_stop.md)とそのあと[`join()`](join.md)を呼び出す。


## 例
```cpp example
#include <iostream>
#include <cstdint>
#include <thread>

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
    std::jthread t1 {f1, 1'000'000};
    std::this_thread::sleep_for(std::chrono::milliseconds{3});

    // スレッド実行する関数がstd::stop_tokenを受け取らない場合、
    // 中断リクエストを使用せず、
    // デストラクタで自動的にjoinするスレッドオブジェクトとして使用する
    std::jthread t2 {
      [] { f2(1'000'000); }
    };
  } // jthreadのデストラクタでは、中断要求を発行し、スレッドの終了を待機する

  std::cout << sum1 << std::endl; // 計算できたところまで表示
  std::cout << sum2 << std::endl;
}
```
* std::uint64_t[link /reference/cstdint/uint64_t.md]
* std::stop_token[link /reference/stop_token/stop_token.md]
* token.stop_requested()[link /reference/stop_token/stop_token/stop_requested.md]
* std::this_thread::sleep_for[link /reference/thread/this_thread/sleep_for.md]

### 出力例
```
103102269753
499999500000
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 10.2.0 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??
