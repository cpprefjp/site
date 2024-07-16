# get_stop_token
* thread[meta header]
* std[meta namespace]
* jthread[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
[[nodiscard]] stop_token get_stop_token() const noexcept;
```
* stop_token[link /reference/stop_token/stop_token.md]


## 概要
停止状態を問い合わせるための[`stop_token`](/reference/stop_token/stop_token.md)オブジェクトを取得する。


## 戻り値
メンバ変数として保持している[`stop_source`](/reference/stop_token/stop_source.md)型オブジェクト`ssource`があるとして、以下と等価：

```cpp
return ssource.get_token();
```
* get_token()[link /reference/stop_token/stop_source/get_token.md]


## 例外
送出しない。


## 例
```cpp example
#include <iostream>
#include <cassert>
#include <thread>

int main()
{
  std::jthread t {
    [](std::stop_token stoken) {
      while (!stoken.stop_requested()) {}
      std::cout << "exit thread" << std::endl;
    }
  };

  t.request_stop();

  // 停止要求が正しく発行されたか調べる
  assert(t.get_stop_token().stop_requested());
}
```
* get_stop_token()[color ff0000]
* std::stop_token[link /reference/stop_token/stop_token.md]
* stop_requested()[link /reference/stop_token/stop_token/stop_requested.md]
* request_stop()[link /reference/thread/jthread/request_stop.md]

### 出力
```
exit t thread
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 10.2.0 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??
