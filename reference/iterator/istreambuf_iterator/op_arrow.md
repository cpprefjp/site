# operator->
* iterator[meta header]
* std[meta namespace]
* istreambuf_iterator[meta class]
* function[meta id-type]
* cpp11[meta cpp]
* cpp17removed[meta cpp]

```cpp
pointer operator->() const;
```

このメンバ関数は、C++11で追加されたが仕様が定まらないまま各処理系で挙動が分かれていたため、C++17で削除された。


## 概要
イテレータを介してメンバアクセスする


## 戻り値
現在指しているオブジェクトへのポインタ


## 備考
この関数はプロキシオブジェクトを返す可能性がある。


## 例
```cpp
```

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [LWG Issue 659. `istreambuf_iterator` should have an `operator->()`](https://cplusplus.github.io/LWG/issue659)
    - C++11で、入力イテレータの要件を満たすためにこの関数が追加された。ただし戻り値の型が未規定とされたため処理系ごとに挙動が分かれ、C++17で削除された
- [LWG Issue 2790. Missing specification of `istreambuf_iterator::operator->`](https://cplusplus.github.io/LWG/issue2790)
    - C++17で、仕様が定まらないこのメンバ関数が削除された
    - このメンバ関数には効果の規定が存在せず、主要な処理系も提供していなかったため、削除による実際の影響はほとんどない
