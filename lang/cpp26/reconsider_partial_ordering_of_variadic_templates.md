# 可変引数テンプレートの半順序を再検討する [P4004R1]
* cpp26[meta cpp]

<!-- start lang caution -->

このページはC++26に採用された言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

<!-- last lang caution -->

## 概要
関数テンプレートのオーバーロード解決では、複数のテンプレートが適合する場合に「どちらがより特殊化されているか」を決める半順序 (partial ordering) の規則が用いられる。C++26では可変引数テンプレートが関わる場合のこの規則を見直し、GCC・Clang・Visual C++といった既存のコンパイラの実装に沿った挙動を標準の規則とする。

具体的には、半順序の可変引数テンプレートの型推論において、「引数側の型が関数パラメータパックから変換されたもので、対応するパラメータ側がパックでない場合、その方向の型推論は失敗する」という仕様になる。合わせて、「両者が互いに同程度に特殊化されていて優劣がつかないとき、一方のテンプレートだけが末尾に関数パラメータパックをもつ場合は、それをもたない側をより特殊化されているとみなす」という、優劣を決めるための追加規則は維持される。

```cpp
template <class... Args>
void f(Args...);           // (1)
template <class T1, class... Args>
void f(T1, Args...);       // (2)
template <class T1, class T2>
void f(T1, T2);            // (3)

f();          // (1)を呼び出す
f(1, 2, 3);   // (2)を呼び出す
f(1, 2);      // (3)を呼び出す。非可変引数テンプレートである(3)が最も特殊化されている
```

この結果はGCC・Clang・Visual C++が以前から採用していた挙動であり、多くの利用者にとって直感的なものである。


## 例
```cpp example
#include <cassert>

template <class... Args>
int f(Args...) { return 1; }              // (1)
template <class T1, class... Args>
int f(T1, Args...) { return 2; }          // (2)
template <class T1, class T2>
int f(T1, T2) { return 3; }               // (3)

int main()
{
  assert(f() == 1);        // (1)
  assert(f(1, 2, 3) == 2); // (2)
  assert(f(1, 2) == 3);    // (3) 非可変引数テンプレートが最も特殊化されている
}
```

### 出力
```
```


## この機能が必要になった背景・経緯
CWG 1395「Partial ordering of variadic templates reconsidered」は、もともと末尾の関数パラメータパックに関する曖昧さを解消するために提起された。しかし最終的に採択された解決 (欠陥報告として適用) は、当初の目的よりはるかに広範なもので、半順序における関数パラメータパックの扱いを根本的に変更するものだった。

この変更のもとでは、たとえば次の例で、GCC・Clang・Visual C++が選ぶ非可変引数版とは異なるオーバーロードが選択されることになる。

```cpp
template <class... T>
char* f(T&...); // #1
template <class T>
int* f(T&&);    // #2

int i;
auto* p = f(i); // 既存の実装は#2を選ぶが、CWG 1395の規定では#1が選ばれる
```

CWG 1395の規定を実装しているのは事実上EDGのみであり、既存のコードを壊すことから、他の実装が追従する見込みも薄かった。また、現行の規定では[temp.deduct.partial]の例の一部が曖昧になる、CWG 1825やCWG 3154で指摘された問題があるなど、追加の不具合も残っていた。

そのため、ほとんど実装されていない規定を維持するよりも、既存の実装慣行 (あるいはそれに近いもの) を標準として明文化する方が有益であると判断された。


## <a id="relative-page" href="#relative-page">関連項目</a>
- [C++11 可変引数テンプレート](/lang/cpp11/variadic_templates.md)


## 参照
- [P4004R1 Reconsider CWG 1395 "Partial ordering of variadic templates reconsidered"](https://open-std.org/jtc1/sc22/wg21/docs/papers/2026/p4004r1.pdf)
    - CWG 1395の変更の大部分を差し戻し、既存の実装に沿った可変引数テンプレートの半順序規則を標準化する
- [CWG 1395 Partial ordering of variadic templates reconsidered](https://wg21.cmeerw.net/cwg/issue1395)
- [CWG 1825 Partial ordering between variadic and non-variadic function templates](https://wg21.cmeerw.net/cwg/issue1825)
- [CWG 3154 Clarify partial ordering involving variadic templates](https://wg21.cmeerw.net/cwg/issue3154)
