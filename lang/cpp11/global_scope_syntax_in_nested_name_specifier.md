# 入れ�名の指定にグ�ーバルスコープ :: を付加することを許可
* cpp11[meta cpp]

## 概要
入れ�名を指定する構文において、先�にグ�ーバルスコープの指定`::`を付加することが許可された。

```cpp
// クラスAの宣言
struct A;

// クラスAの定義
struct ::A {
};
```


## 仕様
nested-name-specifierの構文が、以下のように変更された。

変更前：

```
nested-name-specifier:
  type-name ::
  namespace-name ::
```

変更後：

```
nested-name-specifier:
  :: opt type-name ::
  :: opt namespace-name ::
```
* opt[italic]


## 参照
- [CWG Issue 355. Global-scope `::` in nested-name-specifier](http://www.open-std.org/jtc1/sc22/wg21/docs/cwg_defects.html#355)

