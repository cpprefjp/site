# 範囲for文が範囲初期化子内で生じた一時オブジェクトを延命することを規定

* cpp23[meta cpp]

## 仕様

範囲for文

```
for ( init-statement(opt) for-range-declaration : for-range-initializer ) statement
```

において、`for-range-initializer` の中で生じた一時オブジェクトは、`for-range-initializer` で初期化される参照と同じ寿命まで延命される。

ただし、次の場合には適用されない。

- 一時オブジェクトが関数の引数の場合
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

以下の例では、`getstr()` が返す一時オブジェクトは関数の引数だから、延命されない。

```cpp example
import std;

std::vector<std::string> getstr() {
  return {"hello", "UB"};
}

std::string wrap(const std::string& x) {
    return "[" + x + "]"; 
}

int main()
{
  for(auto&& c : wrap(getstr()[0])) {
    std::println("{}", c);
  }
}
```

### 出力
```
[
h
e
l
l
o
]
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

## 検討されたほかの選択肢

一時オブジェクトの寿命について、範囲for文に限定しない汎用的な方法も検討されたが、最終的には範囲for文の例外規定となった。

## 関連項目

- [範囲for文](/lang/cpp11/range_based_for.md)


## 参照

- [地に足のついた範囲for文 - 地面を見下ろす少年の足蹴にされる私](https://onihusube.hatenablog.com/entry/2022/12/05/000923)
