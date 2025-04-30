# run
* execution[meta header]
* std::execution[meta namespace]
* run_loop[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
void run();
```

## 概要
`run_loop`のFIFOキュー上にある作業を逐次実行する。

`run_loop`動作説明のため、説明専用のメンバ関数`pop-front`, `push-back`を導入する。
[`finish`](finish.md)および`pop-front`, `push-back`は不可分(atomically)に実行される。


### 説明専用メンバ関数 `pop-front`

```cpp
run-loop-opstate-base* pop-front();
```
* run-loop-opstate-base[link run-loop-opstate.md]

効果 : 下記条件のいずれか一つが`true`になるまでブロックする。

- `count == 0`かつ`state`が[終了中(finishing)](finish.md)のとき、`pop-front`は`state`を終了済み(finished)に設定して`nullptr`を返す。
- `count > 0`のとき、`count`を`1`減算してFIFOキューから先頭要素を削除し、同要素（ポインタ値）を返す。


### 説明専用メンバ関数 `push-back`

```cpp
void push-back(run-loop-opstate-base* item);
```
* run-loop-opstate-base[link run-loop-opstate.md]

効果 : FIFOキューの末尾に`item`を追加して`count`を`1`加算する。

同期操作 : この操作は同`item`を取得する`pop-front`操作に対して同期する。


## 事前条件
説明専用メンバ`state`は[開始(starting)](op_constructor.md)もしくは[終了中(finishing)](finish.md)であること。


## 効果
説明専用メンバ`state`が[開始(starting)](op_constructor.md)の場合、実行中(running)に変更する。
そうでなければ、`state`を変更しない。

続いて、以下と等価 :

```cpp
while (auto* op = pop-front()) {
  op->execute();
}
```
* execute()[link run-loop-opstate.md]


## 同期操作
`run`と[デストラクタ](op_destructor.md)以外のメンバ関数同時呼び出しは、データ競合を引き起こさない。


## 例
```cpp example
#include <print>
#include <thread>
#include <execution>
namespace ex = std::execution;

int main()
{
  ex::run_loop loop;
  std::println("starting");

  std::jthread th([&]{
    // 2) 別スレッドからfinishを呼び出し
    std::println("finishing");
    loop.finish();
  });

  // 1) メインスレッド上でrunを呼び出すとブロッキングする
  loop.run();
  // 3) ブロッキング解除されてメインスレッドを再開
  std::println("finished");
}
```
* run()[color ff0000]
* ex::run_loop[link ../run_loop.md]
* finish()[link finish.md]
* std::jthread[link /reference/thread/jthread.md]

### 出力
```
starting
finishing
finished
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
- [`finish`](finish.md)


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
- [P3396R1 std::execution wording fixes](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p3396r1.html)
