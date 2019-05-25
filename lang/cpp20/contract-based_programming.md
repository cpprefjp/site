# 契約に基づくプログラミング
* cpp20[meta cpp]

## 概要
C++20では、いわゆる[契約プログラミング](https://ja.wikipedia.org/wiki/%E5%A5%91%E7%B4%84%E3%83%97%E3%83%AD%E3%82%B0%E3%83%A9%E3%83%9F%E3%83%B3%E3%82%B0)がサポートされる。

## 例
```cpp example
#include <iostream>
#include <cmath>

double sqrt_checked(double x)
  [[expects: x > 0]]   // 引数に対する事前条件
  [[ensures r: r > 0]] // 戻り値に対する事後条件
{
  return std::sqrt(x);
}

int main()
{
  double x;
  std::cin >> x;

  [[assert: x > 0]]; // アサーション

  double y = sqrt_checked(x);
    
  std::cout << y << '\n';
}
```

## 仕様

### 契約属性

契約は[属性](/lang/cpp11/attributes.html)として記述する。C++20では、次の3つの契約属性が導入された：

* `[[expect: 述語]]`：関数に入る際に期待する事前条件を定義する。
* `[[ensure: 述語]]`：関数から戻る際に期待する事後条件を定義する。
* `[[assert: 述語]]`：アサーションを定義する。

述語が副作用を持つ場合、動作は未定義である。

述語が例外を送出すると、[`std::terminate()`](/reference/exception/terminate.md)関数を呼び出してプログラムを終了させる。

### 契約レベルとビルドレベル

契約属性には**契約レベル**を指定できる。

```c++
[[契約属性名 契約レベル: 述語]]
```

契約レベルによって契約がチェックされる条件が異なる。

契約レベルには次の3つがある：

* `default`: ビルドレベルが`off`でなければ常にチェックされる。契約レベルを省略した場合は`default`となる。
* `audit`: ビルドレベルが`audit`の場合のみチェックされる。パフォーマンスへの影響が大きい契約を`audit`にして、普段はチェックしないでおくことができる。
* `axiom`: チェックされない。主な用途は書式の定まったコメントとして使うことである。

C++20では、プログラムのコンパイルは次の3つのうちどれかの**ビルドレベル**で行われる：

* `off`: 契約はチェックされない。
* `default`: 契約レベルが`default`の契約がチェックされる。ビルドレベルが明示されない場合は`default`となる。
* `audit`: 契約レベルが`default`または`audit`の契約がチェックされる。

ビルドレベルを指定する方法は処理系定義である。ただし、ソースコード上で指定する方法は提供されない。

チェックされない契約が評価されるかは未規定である。`false`に評価される場合の動作は未定義である。

### 違反ハンドラーと違反継続モード

違反ハンドラーは `void(const std::contract_violation&)` という型を持つ関数である(処理系によってはさらに`noexcept`が指定される)。

契約がチェックされ、しかも`false`に評価されたとき、違反ハンドラーが実行される。

プログラムは**違反継続モード**`off`または`on`でコンパイルされる。

* `off` (デフォルト): 違反ハンドラーの実行後、[`std::terminate()`](/reference/exception/terminate.md)関数を呼び出してプログラムを終了させる。
* `on`: 違反ハンドラーの実行後、プログラムはそのまま続行する。

違反ハンドラーおよび違反継続モードを指定する方法は処理系定義である。

### expect属性

この属性は関数宣言の関数型に対して指定する。

### ensure属性

```cpp
[[ensure: 述語]]
[[ensure 識別子: 述語]]
```

この属性は関数宣言の関数型に対して指定する。

2番目の書式では、指定した識別子で関数の戻り値を参照できる。

### assert属性

この属性は空文に対して指定する。

## この機能が必要になった背景・経緯

C++17までは、実行時のアサーションとしては[`assert`マクロ](/reference/cassert/assert.html)があるのみだった。
契約属性はアサーションを含む契約を記述する、マクロを用いない新たな方法として導入された。

特に、戻り値に対する契約は従来の[`assert`マクロ](/reference/cassert/assert.html)では簡潔に書くことができなかった。

## 関連項目
- [C++11 属性構文](/lang/cpp11/attributes.html)
- [C++11 コンパイル時アサート](/lang/cpp11/static_assert.md)
- [`assert`マクロ](/reference/cassert/assert.html)

## 参照
- [P0542R5 Support for contract based programming in C++](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0542r5.html)
