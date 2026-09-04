# 無効なポインタ値の読み書き・コピーを定義された動作とする [P3347R6]
* cpp29[meta cpp]

<!-- start lang caution -->

このページはC++29に採用された言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

<!-- last lang caution -->

## 概要
記憶域の生存期間が終了すると、その記憶域を指していたポインタ値は無効なポインタ値になる。C++26までの規格では、無効なポインタ値の間接参照と解放関数への受け渡しが未定義動作であることに加えて、それ以外のあらゆる使用、つまり単なる読み込み・書き込み・コピーまでもが処理系定義の動作だった。極端には、無効なポインタ値の読み込みが無関係な値を返す実装さえ許されていた。

そのため、指す先が解放されうるポインタを規格上正しく扱うには、無効になる前に[`std::uintptr_t`](/reference/cstdint/uintptr_t.md)へ変換して保持しておく必要があり、ポインタを受け渡すプログラム全体へ`std::uintptr_t`が波及してしまうという問題があった。

C++29では、無効なポインタ値`P`を評価`E`で使用した場合の動作が、次のように整理される。

- `E`が間接参照である場合 : 未定義動作（従来どおり）
- `E`が`bool`への変換であるか、単項`+`・加減算・三方比較・関係・等値演算子によって行われる場合 : 処理系定義の動作（従来どおり）
- それ以外（読み込み・書き込み・コピー・初期化・キャストなど） : 定義された動作。ポインタ値は値表現にもとづいて忠実に扱われ、指す先の生存期間が終了したことを理由に実装が値表現を変更することはできない

これによって、無効になっているかもしれないポインタ値を通常のポインタ型のまま読み書き・受け渡しするコードが、定義された動作となる。たとえば以下のロックフリーなLIFOスタックへの追加操作では、非アトミックなメンバ`newnode->next`に保持したポインタ値が、(1)と(2)の間に別スレッドの`pop_all()`によって無効になりうる。

```cpp
void push(Node* newnode) {
  newnode->next = top_.load();  // (1) ポインタを非アトミックなメンバに保持する
  while (true) {
    // (2) newnode->nextを読み込んで比較交換に渡す
    if (top_.compare_exchange_weak(newnode->next, newnode->next)) {
      return;
    }
  }
}
```

C++26までは、(2)での無効なポインタ値の読み込みと受け渡しが処理系定義だったためにこのコードは移植可能ではなかったが、C++29では定義された動作となる（比較交換そのものは[アトミック操作の規定](/lang/cpp29/pointer_lifetime-end_zap_proposed_solutions.md)によって定義された動作となる）。


## 仕様
- 無効なポインタ値の使用は、間接参照が未定義動作、`bool`への変換と単項`+`・加減算・三方比較・関係・等値演算子が処理系定義の動作となり、それ以外の使用は定義された動作となる
- 「無効なポインタ値を含むオブジェクトの読み込み（lvalueからrvalueへの変換）は処理系定義の動作」という規定は削除される
- 指す先のオブジェクトの生存期間が終了しても、ポインタの値表現は変化しない


## 例
```cpp example
#include <iostream>

int main()
{
  int* p = new int(42);
  delete p;

  // pは無効なポインタ値となるが、C++29では以下のようなコピー・書き込み・
  // 読み込みは定義された動作である（間接参照は未定義動作、比較は処理系定義）
  int* q = p;
  int* arr[1];
  arr[0] = q;
  int* r = arr[0];
  (void)r;

  std::cout << "OK" << std::endl;
}
```

### 出力
```
OK
```


## この機能が必要になった背景・経緯
LIFO pushのような並行アルゴリズムは、解放されたかもしれないオブジェクトへのポインタの読み込み・受け渡しに依存しており、これらの操作が処理系定義のままでは移植可能なコードとして書けなかった。ポインタを事前に整数へ変換しておく回避策は、アルゴリズムと無関係な部分にまで`std::uintptr_t`を波及させてしまう。

C++29では、[整数からポインタへの変換の規定](/lang/cpp29/nondeterministic_pointer_provenance.md) (P2434R5) と[アトミック操作・volatileアクセスの規定](/lang/cpp29/pointer_lifetime-end_zap_proposed_solutions.md) (P2414R12) を土台として、残っていた通常の読み書き・コピーを定義された動作とする本提案が採用され、このようなアルゴリズムを通常のポインタ型のまま書けるようになった。


## <a id="relative-page" href="#relative-page">関連項目</a>
- [C++29 整数からポインタへの変換とポインタの由来の扱いを規定](/lang/cpp29/nondeterministic_pointer_provenance.md)
- [C++29 アトミック操作とvolatileアクセスでの無効なポインタ値の扱いを規定](/lang/cpp29/pointer_lifetime-end_zap_proposed_solutions.md)
- [`std::uintptr_t`](/reference/cstdint/uintptr_t.md)


## 参照
- [P3347R6 Invalid Pointer Operations](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3347r6.pdf)
- [CWG Issue 2822. Side-effect-free pointer zap](https://cplusplus.github.io/CWG/issues/2822.html)
    - 生存期間の終了がポインタの値表現に影響しないことを明確化したIssue
