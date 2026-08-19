# operator=
* thread[meta header]
* std[meta namespace]
* jthread[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
jthread& operator=(const jthread&) = delete; // (1) C++20
jthread& operator=(jthread&& x) noexcept;    // (2) C++20
```

## 概要
`jthread`オブジェクトの代入。

- (1) : コピー代入。コピー不可
- (2) : ムーブ代入。ムーブ不可


## 効果
- `&x == this`（自己代入）の場合、効果はない
- それ以外の場合、以下を行う
    - [`joinable()`](joinable.md)が`true`を返す場合、[`request_stop()`](request_stop.md)と[`join()`](join.md)を呼び出す
    - `x`の状態を`*this`に代入し、`x`をデフォルト構築された状態に設定する


## 事後条件
- [`get_id()`](get_id.md)の呼び出しでは、代入前の`x.`[`get_id()`](get_id.md)が返されるようになること
- メンバ変数として保持している[`std::stop_source`](/reference/stop_token/stop_source.md)型オブジェクト`ssource`は、代入前の`x.ssource`の値を持つこと


## 戻り値
`*this`を返す。


## 例
```cpp example
#include <thread>
#include <cassert>
#include <utility>

int main()
{
  std::jthread jt1([]{ /*...*/ });
  std::jthread jt2;
  assert(jt1.joinable() && !jt2.joinable());

  // jt1からjt2へムーブ代入
  jt2 = std::move(jt1);
  assert(!jt1.joinable() && jt2.joinable());

  jt2.join();
}
```
* jt2 = std::move(jt1);[color ff0000]
* joinable()[link joinable.md]

### 出力
```
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 10.2.0 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [LWG Issue 3788. `jthread::operator=(jthread&&)` postconditions are unimplementable under self-assignment](https://cplusplus.github.io/LWG/issue3788)
    - C++23で、自己代入(`&x == this`)の場合は効果がないことが効果に明記され、自己代入時に成立しない事後条件（`x.get_id() == id()`、`x.ssource.stop_possible()`が`false`）が削除された
