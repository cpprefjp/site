# sends_stopped
* execution[meta header]
* std::execution[meta namespace]
* variable[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  template<class Sndr, class Env = env<>>
    requires sender_in<Sndr, Env>
  constexpr bool sends_stopped =
    !same_as<type-list<>,
             gather-signatures<set_stopped_t, completion_signatures_of_t<Sndr, Env>,
                               type-list, type-list>>;
}
```
* env<>[link env.md]
* sender_in[link sender_in.md]
* gather-signatures[link gather-signatures.md]
* set_stopped_t[link set_stopped.md]
* completion_signatures_of_t[link completion_signatures_of_t.md]

## 概要
[Sender型](sender.md)`Sndr`が[環境](receiver.md)`Env`において非同期操作を作成できるとき、[完了シグネチャ集合](completion_signatures.md)が[停止完了シグネチャ](set_stopped.md)を含むか否かを返す。


## 例
```cpp example
#include <concepts>
#include <execution>
namespace ex = std::execution;

int main()
{
  // 停止完了シグネチャを持たないSender
  ex::sender auto snd1 = ex::just(123, 'X');
  static_assert(not ex::sends_stopped<decltype(snd1)>);

  // 停止完了シグネチャ set_stopped_t()
  ex::sender auto snd2 = ex::just_stopped();
  static_assert(ex::sends_stopped<decltype(snd2)>);
}
```
* ex::sends_stopped[color ff0000]
* ex::sender[link sender.md]
* ex::just[link just.md]
* ex::just_stopped[link just_stopped.md.nolink]

### 出力
```
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`execution::completion_signatures`](completion_signatures.md)
- [`execution::set_stopped`](set_stopped.md)


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
