# コルーチンのpromise型で`return_value`と`return_void`の両方の宣言を許可 [P3950R1]
* cpp29[meta cpp]

<!-- start lang caution -->

このページはC++29に採用された言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

<!-- last lang caution -->

## 概要
C++29では、コルーチンのpromise型が`return_value`と`return_void`の両方のメンバ関数を宣言できるようになる。これによって、1つのコルーチンの本体に、値をともなう`co_return v;`と値をともなわない`co_return;`の両方の文を書けるようになる。

```cpp
task f(bool b) {
  if (b) {
    co_return 42;  // promise.return_value(42)の呼び出し
  }
  co_return;       // promise.return_void()の呼び出し
}
```

C++26までは、promise型のスコープでの名前`return_void`と`return_value`の探索が両方とも宣言を見つけた場合、プログラムは不適格と規定されていた。この制限は名前の探索にもとづいていたため、両方の関数が同時にオーバーロード解決可能になることがないよう制約 (`requires`) を付けた宣言であっても、宣言が存在するだけで不適格となり、ジェネリックなpromise型の実装方法を不必要に制限していた。


## 仕様
- promise型が`return_value`と`return_void`の両方を宣言した場合にプログラムを不適格とする規定が削除される
- コルーチン本体の終端到達の規定が、名前探索ではなくオーバーロード解決にもとづいて定義し直される
    - `p.return_void()`のオーバーロード解決が成功する場合、コルーチン本体の終端到達はオペランドなしの`co_return`と等価である
    - そうでない場合、コルーチン本体の終端到達は未定義動作である
- 機能テストマクロ`__cpp_impl_coroutine`の値が`202606L`に更新される


## 例
```cpp
#include <coroutine>
#include <iostream>

struct task {
  struct promise_type {
    task get_return_object() { return {}; }
    std::suspend_never initial_suspend() { return {}; }
    std::suspend_never final_suspend() noexcept { return {}; }
    void unhandled_exception() {}

    // C++26までは、この2つを同時に宣言するとプログラムが不適格だった
    void return_void() {
      std::cout << "void" << std::endl;
    }
    void return_value(int x) {
      std::cout << "value: " << x << std::endl;
    }
  };
};

task f(bool b) {
  if (b) {
    co_return 42;
  }
  co_return;
}

int main() {
  f(true);
  f(false);
}
```
* std::suspend_never[link /reference/coroutine/suspend_never.md]

### 出力
```
value: 42
void
```


## この機能が必要になった背景・経緯
`return_value`と`return_void`の同時宣言の禁止は、コルーチンが導入される前の初期の提案（N4499）から存在していた規定である。初期の設計にはコルーチンの「最終的な型 (eventual type)」という概念があり、戻り値の型を1つに定める必要があったが、この概念は最終的な仕様からは削除されており、禁止だけが残っていた。

コルーチンの本体は通常の関数の本体とは異なり、promiseオブジェクトと対話するためのプロトコルへ書き換えられるものであるため、「関数の戻り値は1つの型で1通り」という通常の関数の性質に合わせる必然性はない。特にC++26で導入された[`std::execution`](/reference/execution.md)の完了シグネチャは、値をともなわない完了`set_value_t()`と値をともなう完了`set_value_t(T...)`の混在を表現できる。promise型はメンバ関数テンプレートによって複数の型の`co_return`を異なる完了シグネチャへ対応付けられるが、値をともなわない完了だけは`return_void`を宣言できないために特別なタグ型を受け取るといった回避策が必要で、コルーチンが`std::execution`の表現力に追いつけない状態だった。

同じ目的の提案（P1713R0）は2019年のケルン会議で合意に至らなかったが、`std::execution`の採用という新しい状況を受けて本提案が再提案され、採択された。


## <a id="relative-page" href="#relative-page">関連項目</a>
- [C++20 コルーチン](/lang/cpp20/coroutines.md)


## 参照
- [P3950R1 `return_value` & `return_void` Are Not Mutually Exclusive](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3950r1.pdf)
- [P1713R0 Allowing both `co_return;` and `co_return value;` in the same coroutine](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1713r0.pdf)
    - 同じ目的の以前の提案。2019年のケルン会議で合意に至らなかった
