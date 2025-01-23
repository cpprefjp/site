# 条件付きで特殊メンバ関数をトリビアルに定義するように
* cpp20[meta cpp]

このページはC++20に採用された言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

## 概要

クラスの特殊メンバ関数（コンストラクタ・代入演算子・デストラクタ）の`default`宣言をコンセプトによって制約することで、テンプレートパラメータの性質に応じて優先的に選択させることができる様になる。

```cpp
template<typename T>
struct wrap {
  
  // 1. 制約されたdefaultなコピーコンストラクタ
  wrap(const wrap&) requires std::is_trivially_copy_constructible_v<T> = default;
  
  // 2. ユーザー定義コピーコンストラクタ
  wrap(const wrap&) {
    ...
  }
};
```

`T`が`std::is_trivially_copy_constructible`を満たす場合、1の宣言が選択され`wrap<T>`のコピーコンストラクタは`default`実装される（2のコンストラクタが選択されることは無い）。`T`が`std::is_trivially_copy_constructible`を満たさない場合、2の宣言が選択され`wrap<T>`のコピーコンストラクタはユーザー定義される。

特に、`T`がトリビアルコピー可能である場合にこの仕組みによって1のコンストラクタが選択されれば、（他の条件を満たしているものとして）`wrap<T>`もまたトリビアルコピー可能となる。

## 仕様

(執筆中)


## 例

(執筆中)

```cpp example
// (ここには、言語機能の使い方を解説するための、サンプルコードを記述します。)
// (インクルードとmain()関数を含む、実行可能なサンプルコードを記述してください。そのようなコードブロックにはexampleタグを付けます。)

#include <iostream>

int main()
{
  int variable = 0;
  std::cout << variable << std::endl;
}
```
* variable[color ff0000]

### 出力
```
0
```

## この機能が必要になった背景・経緯

(執筆中)


## 検討されたほかの選択肢

(執筆中)


## ## <a id="relative-page" href="#relative-page">関連項目</a>

- [コンセプト](./concepts.md)

## 参照

- [P0848R0 Conditionally Trivial Special Member Functions](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0848r0.html)
- [P0848R3 Conditionally Trivial Special Member Functions](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0848r3.html)
