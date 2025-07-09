# request_stop
* thread[meta header]
* std[meta namespace]
* jthread[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
bool request_stop() noexcept;
```


## 概要
スレッドに対する停止要求を作成する。

この関数を実行することで、対象のスレッドがもつ[`std::stop_token`](/reference/stop_token/stop_token.md)型オブジェクトの[`stop_requested()`](/reference/stop_token/stop_token/stop_requested.md)メンバ関数が`true`を返すようになる。


## 効果
メンバ変数として保持している[`std::stop_source`](/reference/stop_token/stop_source.md)型オブジェクト`ssource`があるとして、以下と等価：

```cpp
return ssource.request_stop();
```
* request_stop()[link /reference/stop_token/stop_source/request_stop.md]


## 例外
送出しない。


## 例
```cpp example
#include <iostream>
#include <thread>

int main()
{
  std::jthread jt {
    [](std::stop_token stoken) {
      while (!stoken.stop_requested()) {
        // 停止要求がくるまで処理を継続する…
      }
      std::cout << "exit jt thread" << std::endl;
    }
  };

  // 停止要求を作成する
  jt.request_stop();
  jt.join();
}
```
* request_stop()[color ff0000]
* std::stop_token[link /reference/stop_token/stop_token.md]
* stop_requested()[link /reference/stop_token/stop_token/stop_requested.md]
* jt.join()[link join.md]

### 出力
```
exit jt thread
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 10.2.0 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??
