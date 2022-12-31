# begin
* generator[meta header]
* std[meta namespace]
* generator[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
iterator begin();
```
* iterator[link iterator.md]


## 概要
ジェネレータコルーチンが生成するViewの先頭を指すイテレータを取得する。


## 事前条件
ジェネレータコルーチンは[初期サスペンドポイント](/lang/cpp20/coroutines.md)で中断している。


## 効果
ジェネレータ子ルーチンを再開(resume)する。


## 戻り値
ジェネレータコルーチンに対応する[`iterator`](iterator.md)オブジェクト。


## 備考
同じジェネレータ上で`begin`を複数回呼び出すと、プログラムは未定義の動作を引き起こす。


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
