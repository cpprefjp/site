#デストラクタ
* future[meta header]
* std[meta namespace]
* future[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
~future();
```

##概要
`future`オブジェクトの破棄


##効果
共有状態を解放し、`*this`を破棄する。


##備考
[`async()`](../async.md)関数を[`launch::async`](../launch.md)ポリシーで実行した結果の`future`オブジェクトの場合のみ、そのデストラクタは非同期タスクの実行を待機(`join`)する。


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
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 11.0


##参照
[async関数launch::asyncポリシーとfutureのちょっと特殊な動作 - yohhoyの日記](http://d.hatena.ne.jp/yohhoy/20120317/p1)
[async関数launch::asyncポリシーとfutureのちょっと特殊な動作（続き） - yohhoyの日記](http://d.hatena.ne.jp/yohhoy/20121004/p1)


