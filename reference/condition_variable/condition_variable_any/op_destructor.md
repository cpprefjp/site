#デストラクタ (C++11)
* condition_variable[meta header]
* std[meta namespace]
* condition_variable_any[meta class]
* function[meta id-type]

```cpp
~condition_variable_any();
```

##概要
`condition_variable_any`オブジェクトの破棄を行う


##要件
`*this`を参照している全てのスレッドがブロッキングされていないこと。

つまり、デストラクタが呼び出される前に、`*this`の`condition_variable`オブジェクトを待機している全てのスレッドに起床通知を送らなければならない。


##効果
条件変数を破棄する


##例
```cpp
```

###出力
```
```


##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++0x mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 11.0, 12.0


##参照


