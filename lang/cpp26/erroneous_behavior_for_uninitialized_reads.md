# 未初期化変数の読み取りを「erroneous behavior」とする [P2795R5]
* cpp26[meta cpp]

<!-- start lang caution -->

このページはC++26に採用される見込みの言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

<!-- last lang caution -->

## 概要
C++23までは、未初期化変数 (デフォルト初期化された変数) の読み取りは未定義動作として扱われていた。C++26では、この未定義動作による安全上のリスクを低減するため、「「erroneous behavior」 (erroneous behavior; 通称 EB)」を新設してその多くに割り当てることとした。

```cpp example
// C++23
void f(int) {}

int main() {
  int x; // デフォルト初期化。xは不定値 (indeterminate value) をもつ
  f(x);  // 左辺値から右辺値への変換が未定義動作を引き起こす
}
```

未初期化の値は、コンパイラやターゲット環境によって定義された固定値である。コンパイラにはこの誤りを診断することが許可され、推奨されているが、誤りを無視して有効な読み取りとして扱うことも許可されている。このコードは誤りではあるが、実行ごとに異なる動作をしたり攻撃者に値を制御されたりといったリスクはなくなる。

「erroneous behavior」は未定義動作とはちがって、明確に定義された動作をするがコードとして正しくない、ということを規定するものであり、処理系に対して有用な診断を提供するものである。

C++26では、不定値で初期化されることを明確に指示する`[[indeterminate]]`属性も導入され、以下のような動作となる：

```cpp example
// C++26
void f(int) {}

int main() {
  int x;                   // xは「erroneous value」をもつ
  int y [[indeterminate]]; // 意図して不定値に初期化されることを指示

  f(x); // 「erroneous behavior」 (「erroneous value」の読み取り)
  f(y); // 未定義動作 (不定値の読み取り)
}
```


## 仕様
- 自動記憶域期間をもつオブジェクトの記憶域は確保時点で「erroneous value」をもつとされ、処理系がプログラムの状態に依存せず決定する何らかの値で埋められる
  - 動的記憶域期間であれば不定値、静的・スレッド記憶域期間であればゼロで埋められる。C++23までは自動記憶域期間も不定値で埋められていた
- 初期化されなかったスカラ型オブジェクトなど、値表現（パディングは含まない）内のいずれかのビットに「erroneous value」をもつオブジェクトは「erroneous value」をもつとされる
- 式が評価された結果として「erroneous value」が生成された場合、「erroneous behavior」を引き起こす
  - ただし、`unsigned char`（およびunsignedとなる場合は`char`）もしくは[`std::byte`](/reference/cstddef/byte.md)型の「erroneous value」がこれらの型のオブジェクトの初期化・代入に使用される場合や値が破棄される場合は「erroneous behavior」にならない
  - これらのルールは、式が評価された結果として不定値が生成された場合に未定義の動作を引き起こすとする従来のルールと同様である
- 「erroneous behavior」を引き起こしたうえで生成された値は、後続の処理では「erroneous value」とはみなされない

```cpp example
#include <cassert>

int g(bool b) {
  unsigned char c;
  unsigned char d = c; // 「erroneous behavior」ではない。dは「erroneous value」をもつ

  assert(c == d);      // 常に真、「erroneous behavior」 (整数昇格)

  int e = d;           // 「erroneous behavior」 (型変換)
  return b ? d : 0;    // bがtrueの場合に「erroneous behavior」
}

int main() {
  int d1, d2;

  int e1 = d1;      // 「erroneous behavior」
  int e2 = d1;      // 「erroneous behavior」

  // 処理が続行した場合…
  assert(e1 == e2); // 常に真、「erroneous behavior」ではない。
                    // 「erroneous behavior」の結果で生成された値 (e1とe2) は、
                    // 「erroneous value」とはみなされない
  assert(e1 == d1); // 常に真、「erroneous behavior」
  assert(e2 == d1); // 常に真、「erroneous behavior」

  // 「erroneous behavior」ではないが
  // d2は「erroneous value」をもつ
  std::memcpy(&d2, &d1, sizeof(int));

  assert(e1 == d2); // 常に真、「erroneous behavior」
  assert(e2 == d2); // 常に真、「erroneous behavior」
}
```

### `[[indeterminate]]`属性
`[[indeterminate]]`属性は、自動変数が初期状態として意図して不定値をもつことを指示するものであり、自動変数の定義、もしくは関数のパラメータ宣言に適用できる。

関数のパラメータが`[[indeterminate]]`属性で宣言される場合、その関数の最初の宣言でそのように宣言されなければならない (注：関数宣言は複数行うことができるが、その最初の宣言で`[[indeterminate]]`属性をつけなければならない)。

`[[indeterminate]]`がつけられた変数から読み取りをした場合、未定義動作を引き起こす可能性がある。

```cpp example
struct T {
  T() {}
  int x;
};

int h(T t [[indeterminate]]) {
  f(t.x);   // 後述の関数呼び出しはここで未定義動作を引き起こす
  return 0;
}

int main() {
  int _ = h(T());
}
```

### 今後、「erroneous behavior」に分類される可能性のある操作

現在、未定義動作に分類される以下の操作は、「erroneous behavior」に分類できる可能性がある。

| 操作 | 備考 |
|------|------|
| 符号付き整数のオーバーフロー | 演算結果としてオーバーフローした場合に誤った結果になる可能性がある。これは珍しいバグではない。これは安全上の大きな問題ではない |
| 算術型の変換結果としてその型の表現可能な範囲を超えた | 符号付き整数のオーバーフローと同じ |
| 誤ったビットシフト (負のシフト幅や、上限を超えたシフト幅) | 符号付き整数のオーバーフローと同じ |
| ゼロ割り | いくつかの固定値での誤った結果となる可能性がある。影響が不明確であるため、変更にはコストがかかる |
| 戻り値型が非`void`な関数から返った、もしくは`[[noreturn]]`属性をつけた関数から返った | [`std::terminate()`](/reference/exception/terminate.md)が呼ばれる可能性がある。変更には軽いコストがかかるが、その変更にどの程度の価値があるかは不明 |
| 抽象クラスのコンストラクタ・デストラクタからの純粋仮想関数の呼び出し | 特定の純粋仮想ハンドラが呼ばれる可能性がある。実装によってはすでに「erroneous behavior」のように扱われている可能性がある |
| 契約違反 | 契約に関する現在の策定作業では、契約違反時になにが起こるべきかという問題に直面している。「erroneous behavior」という概念は有用な回答を与えてくれる可能性がある |


## 備考
- 以下のようなケースでは、erroneous behaviorではなく未定義動作を引き起こす可能性がある：
    ```cpp
    T* p;    // 未初期化のポインタ。erroneous value (例としてヌルポインタ) をもつ
    bool b;  // 未初期化の真理値。erroneous valueとして、
             // 妥当ではないbool値 (trueでもfalseでもない値) をもつ可能性がある

    f(*p);   // 間接参照は未定義動作を引き起こす
    g(b);    // bが妥当な値である場合にerroneous behavior、そうでなければ未定義動作
    ```


## 参照
- [P2795R5 Erroneous behaviour for uninitialized reads](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2795r5.html)
