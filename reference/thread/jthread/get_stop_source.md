# get_stop_source
* thread[meta header]
* std[meta namespace]
* jthread[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
[[nodiscard]]
stop_source get_stop_source() noexcept; // (1) C++20
stop_source get_stop_source() noexcept; // (1) C++26
```
* stop_source[link /reference/stop_token/stop_source.md]


## 概要
停止要求を作成するための[`stop_source`](/reference/stop_token/stop_source.md)オブジェクトを取得する。


## 戻り値
メンバ変数として保持している[`stop_source`](/reference/stop_token/stop_source.md)オブジェクトを返す。

## 例外
送出しない。


## 例
```cpp example
#include <iostream>
#include <thread>

int main()
{
  std::jthread t1 {
    [](std::stop_token stoken) {
      while (!stoken.stop_requested()) {}
      std::cout << "exit t1 thread" << std::endl;
    }
  };

  // 別スレッドを立てて、そのスレッドからt1スレッドに停止要求を発行する
  std::jthread t2 {
    [ssource = t1.get_stop_source()]() {
      ssource.request_stop();
    }
  };
}
```
* get_stop_source()[color ff0000]
* std::stop_token[link /reference/stop_token/stop_token.md]
* stop_requested()[link /reference/stop_token/stop_token/stop_requested.md]
* request_stop()[link /reference/stop_token/stop_source/request_stop.md]

### 出力
```
exit t1 thread
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 10.2.0 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P2422R1 Remove `nodiscard` annotations from the standard library specification](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2422r1.html)
    - C++26で`[[nodiscard]]`指定が削除された
