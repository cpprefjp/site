# 範囲for文が範囲初期化子内で生じた一時オブジェクトを延命することを規定

* cpp23[meta cpp]

## 仕様

範囲for文

```
for ( init-statement(opt) for-range-declaration : for-range-initializer ) statement
```

において、`for-range-initializer` の中で生じた一時オブジェクトは、`for-range-initializer` で初期化される参照と同じ寿命まで延命される。

ただし、次の場合には適用されない。

- 一時オブジェクトが関数の引数として生成された場合
- 一時オブジェクトの(この規定が適用されない場合の)寿命が `for-range-initializer` 完全式の終わりではない場合

## 例

以下の例では、`getstr()` が返す一時オブジェクトが範囲for文の末端まで延命されている。

```cpp example
import std;

std::vector<std::string> getstr() {
  return {"hello", "notUB"};
}

int main()
{
  for(auto&& c : getstr()[1]) {
    std::println("{}", c);
  }
}
```

### 出力
```
n
o
t
U
B
```

## この機能が必要になった背景・経緯

範囲for文をより安全に使えるように改善するために仕様が変更された。

従来の仕様では、範囲for文を使う際に気が付きにくいダングリング参照を発生させる可能性があった。

```cpp example
#include <vector>
#include <string>
#include <iostream>

std::vector<std::string> getstr() {
  return {"hello", "UB"};
}

int main()
{
  for(auto&& c : getstr()[0]) {
    std::cout << c << std::endl;
  }
}
```

このコードでは `getstr()` が一時オブジェクトとして `std::vector<std::string>` を返し、範囲for文の範囲はその0番目の `std::string` の参照で初期化される。

この範囲for文は次のように展開される。

```cpp example
#include <vector>
#include <string>
#include <iostream>

std::vector<std::string> getstr() {
  return {"hello", "UB"};
}

int main()
{
  {
    auto&& r = getstr()[0];
    auto b = r.begin();
    auto e = r.end();
    for(; b != e; ++b) {
      auto&& c = *b;
      std::cout << c << std::endl;
    }
  }
}
```

ここで、`r` を初期化しているのは `getstr()` の返した一時オブジェクトではなく、その0番目の要素の参照である。そのため一時オブジェクト `std::vector<std::string>` はこの行の終わりに破棄され、`r` はダングリング参照となる。

C++23では、`getstr()` の呼び出しが `for-range-initializer` の中にあるため、返った一時オブジェクトは参照 `r` と同じ寿命になる。したがってダングリング参照は発生せず、このコードは安全である。

### 例外規定について

"一時オブジェクトが関数の引数として生成された場合" とは、次のサンプルコードにおける `f2(T t)` の実引数 `t` として、呼び出される関数のスコープで生成されるような場合である。

```cpp
// P2718R0より引用
using T = std::list<int>;
const T& f1(const T& t) { return t; }
const T& f2(T t)        { return t; }
T g();

void foo() {
  for (auto e : f1(g())) {}  // OK: g()の戻り値は延命される
  for (auto e : f2(g())) {}  // 未定義動作
}
```

このような `t` は呼び出される関数から戻ると破棄されるから、その参照を返すことは未定義動作である。
ここで未定義動作になることは範囲for文の危険性と無関係なので、寿命を延長するという解釈ができないようにこの例外規定が入った。

議論:

この例外規定の解釈は難解であり議論がある。

- この `t` は "一時オブジェクトの寿命が `for-range-initializer` 完全式の終わりではない場合" にも該当すると考えられる
- この `t` は、構文的に見ると `for-range-initializer` の中で生じたとは言えないという意見もある
- "`for-range-initializer` の中" を実行時のことだと解釈すると、そこから呼び出された関数の中なども含むことになるが、それを排除する規定が "一時オブジェクトの寿命が `for-range-initializer` 完全式の終わりではない場合" ではないか
  - インライン展開されたときなどに効いてくるのかもしれない

## 検討されたほかの選択肢

一時オブジェクトの寿命について、範囲for文に限定しない汎用的な方法も検討されたが、最終的には範囲for文の例外規定となった。

## 関連項目

- [範囲for文](/lang/cpp11/range_based_for.md)

## 参照
- [P2718R0 Wording for P2644R1 Fix for Range-based for Loop](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2718r0.html)
- [地に足のついた範囲for文 - 地面を見下ろす少年の足蹴にされる私](https://onihusube.hatenablog.com/entry/2022/12/05/000923)
- [範囲for文範囲初期化子内の一時オブジェクト延命の説明見直し
 #1246](https://github.com/cpprefjp/site/issues/1246)
- [Are function parameter objects temporary objects?](https://stackoverflow.com/questions/77676199/are-function-parameter-objects-temporary-objects/77676480)
