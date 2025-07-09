# compare_three_way

* compare[meta header]
* class[meta id-type]
* std[meta namespace]
* cpp20[meta cpp]

```cpp
struct compare_three_way {

  template<class T, class U>
    requires three_way_comparable_with<T, U> || BUILTIN-PTR-THREE-WAY(T, U)
  constexpr auto operator()(T&& t, U&& u) const;

  using is_transparent = /*unspecified*/;
};
```

## 概要

`compare_three_way`クラスは、`<=>`による三方比較を行う関数オブジェクトである。  
特に、ポインタの比較時に実装定義の狭義全順序による比較を行うため、組み込みの`< <= > >=`演算子での順序付けが未規定の場合でも順序付けを行う事ができる。


## メンバ関数

| 名前                                         | 説明 | 対応バージョン |
| -------------------------------------------- | ---- | -------------- |
| [`operator()`](compare_three_way/op_call.md) |  三方比較を行う    | C++20          |

## メンバ型

| 名前             | 説明                                                                                                                                                   | 対応バージョン |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------- |
| `is_transparent` | `operator()` が関数テンプレートである事を示すタグ型。<br/>実装依存の型であるがあくまでタグ型であり、型そのものには意味はない。（T が void の場合のみ） | C++20          |

## 備考
このクラスは`<compare>`ヘッダの他に、`<functional>`ヘッダをインクルードすることでも使用可能になる。

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 10.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??

## 関連項目

- [C++20 `<=>`/`==`による比較演算子の自動定義](/lang/cpp20/consistent_comparison.md)


## 参照

- [P0768R1 Library support for the spaceship (comparison) operator](http://wg21.link/p0768)
- [P1614R2 The Mothership has Landed (Adding <=> to the Library)](http://wg21.link/p1614)
